import { api } from './api'

/**
 * Obtiene el perfil del miembro autenticado.
 */
export const obtenerMiPerfil = () => api.get('/miembros/mi-perfil/')

/**
 * Actualiza el perfil de un miembro (solo admins o el mismo usuario).
 */
export const actualizarPerfil = (id, data) =>
  api.put(`/miembros/${id}/`, data)

/**
 * Lista todos los miembros (solo admins).
 */
export const obtenerTodosLosMiembros = () => api.get('/miembros/')

/**
 * Crea un nuevo miembro (solo superusuario).
 */
export const crearMiembro = (data) => api.post('/miembros/', data)

