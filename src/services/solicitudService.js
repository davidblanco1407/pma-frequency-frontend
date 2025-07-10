import { api } from './api'

/**
 * Envía una solicitud de corrección.
 */
export const enviarSolicitud = (data) => api.post('/miembros/solicitudes/', data)

/**
 * Lista todas las solicitudes (admins) o solo las propias (miembro).
 */
export const obtenerSolicitudes = () => api.get('/miembros/solicitudes/')

/**
 * Permite actualizar una solicitud (estado/respuesta).
 */
export const actualizarSolicitud = (id, data) =>
  api.patch(`/miembros/solicitudes/${id}/`, data)
