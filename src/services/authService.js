import { api } from './api'

/**
 * Inicia sesión y obtiene los tokens.
 * @param {Object} credentials - { email, password }
 */
export const login = (credentials) => api.post('/token/', credentials)

/**
 * Solicita un nuevo token de acceso usando el refresh token.
 * @param {string} refresh
 */
export const refreshToken = (refresh) =>
  api.post('/token/refresh/', { refresh })

/**
 * Cambia la contraseña del usuario autenticado.
 * @param {Object} data - { old_password, new_password }
 */
export const cambiarPassword = (data) =>
  api.post('/cambiar-password/', data)

/**
 * Envia un correo con el link para recuperar contraseña.
 * @param {Object} data - { email }
 */
export const enviarResetPassword = (data) =>
  api.post('/recuperar-password/', data)

/**
 * Confirma el restablecimiento de la contraseña.
 * @param {string} uid
 * @param {string} token
 * @param {Object} data - { new_password }
 */
export const confirmarResetPassword = (uid, token, data) =>
  api.post(`/reset-password/${uid}/${token}/`, data)
