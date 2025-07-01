import { useEffect, useState } from 'react'
import { obtenerMiPerfil } from '../../services/miembroService'
import { handleApiError } from '../../services/handleApiError'

export default function Perfil() {
  const [perfil, setPerfil] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const res = await obtenerMiPerfil()
        setPerfil(res.data)
      } catch (err) {
        setError(handleApiError(err))
      } finally {
        setLoading(false)
      }
    }

    cargarPerfil()
  }, [])

  if (loading) return <p>Cargando tu perfil...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!perfil) return <p>No se pudo cargar tu perfil.</p>

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>Mi Perfil</h2>
      <p><strong>Nombre completo:</strong> {perfil.nombre_completo}</p>
      <p><strong>Email:</strong> {perfil.email}</p>
      <p><strong>Teléfono:</strong> {perfil.telefono}</p>
      <p><strong>Activo:</strong> {perfil.activo ? 'Sí' : 'No'}</p>
      <p><strong>¿Puede volver?</strong> {perfil.puede_volver ? 'Sí' : 'No'}</p>
      console.log(perfil)
      <p><strong>Fecha de registro:</strong> {new Date(perfil.fecha_registro).toLocaleString()}</p>
    </div>
  )
}
