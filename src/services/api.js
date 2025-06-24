// src/services/api.js
import axios from 'axios'

// URL base de la API desde .env o por defecto localhost
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Instancia de Axios configurada
const apiInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adjuntar token si existe
apiInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

// Interceptor para manejar errores globales como 401
apiInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Funciones limpias para cada tipo de request
export const api = {
  get: (url, config = {}) => apiInstance.get(url, config),
  post: (url, data, config = {}) => apiInstance.post(url, data, config),
  put: (url, data, config = {}) => apiInstance.put(url, data, config),
  patch: (url, data, config = {}) => apiInstance.patch(url, data, config),
  delete: (url, config = {}) => apiInstance.delete(url, config)
}
