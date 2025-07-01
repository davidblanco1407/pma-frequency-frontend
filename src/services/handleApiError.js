/**
 * Extrae un mensaje de error legible para el usuario.
 * @param {Error} error
 * @returns {string}
 */
export const handleApiError = (error) => {
  if (error.response?.data?.detail) return error.response.data.detail
  if (error.message) return error.message
  return 'Ocurrió un error inesperado. Intenta de nuevo.'
}
