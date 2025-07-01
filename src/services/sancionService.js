import { api } from './api'

/**
 * Crea una nueva sanción.
 */
export const crearSancion = (data) => api.post('/sanciones/', data)

/**
 * Lista todas las sanciones (solo admins).
 */
export const listarSanciones = () => api.get('/sanciones/')

/**
 * Edita una sanción existente.
 */
export const editarSancion = (id, data) =>
  api.put(`/sanciones/${id}/`, data)
