import axios from 'axios'
import { refreshToken } from './authService'

/**
 * URL base de la API: puede venir desde el archivo .env (VITE_API_URL) o usar localhost como fallback.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

/**
 * Instancia centralizada de Axios con configuración global.
 */
const apiInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Variables para evitar múltiples llamadas de refresh al mismo tiempo.
 */
let isRefreshing = false
let failedQueue = []

/**
 * Maneja la cola de peticiones fallidas mientras el token se refresca.
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) promise.reject(error)
    else promise.resolve(token)
  })
  failedQueue = []
}

/**
 * Interceptor de petición: añade el token de acceso (si existe) al header Authorization.
 */
apiInstance.interceptors.request.use(config => {
  const access = localStorage.getItem('access')
  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }
  return config
}, error => Promise.reject(error))

/**
 * Interceptor de respuesta:
 * - Si el token expiró (401), intenta refrescarlo automáticamente.
 * - Si el refresh también falla, limpia todo y redirige al login.
 */
apiInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const refresh = localStorage.getItem('refresh')

    if (error.response?.status === 401 && refresh && !originalRequest._retry) {
      if (isRefreshing) {
        // Cola de espera si ya hay un refresh en curso
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiInstance(originalRequest)
        }).catch(err => Promise.reject(err))
      }

      // Intento de refresh
      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await refreshToken(refresh)
        const newAccess = res.data.access
        localStorage.setItem('access', newAccess)
        apiInstance.defaults.headers.Authorization = `Bearer ${newAccess}`
        processQueue(null, newAccess)
        return apiInstance(originalRequest)
      } catch (err) {
        // Si también falla el refresh, cerramos sesión
        processQueue(err, null)
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

/**
 * Exportamos funciones limpias para que usar Axios sea más cómodo.
 */
export const api = {
  get: (url, config = {}) => apiInstance.get(url, config),
  post: (url, data, config = {}) => apiInstance.post(url, data, config),
  put: (url, data, config = {}) => apiInstance.put(url, data, config),
  patch: (url, data, config = {}) => apiInstance.patch(url, data, config),
  delete: (url, config = {}) => apiInstance.delete(url, config)
}
