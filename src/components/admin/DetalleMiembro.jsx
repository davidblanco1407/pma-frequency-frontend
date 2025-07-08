import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { handleApiError } from '../../services/handleApiError'
import ModalMiembro from './ModalMiembro'
import ModalSancion from './ModalSancion'

export default function DetalleMiembro() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [miembro, setMiembro] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [accionLoading, setAccionLoading] = useState(false)
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false)
  const [mostrarModalSancion, setMostrarModalSancion] = useState(false)

  useEffect(() => {
    const fetchMiembro = async () => {
      try {
        const res = await api.get(`/miembros/${id}/`)
        setMiembro(res.data)
      } catch (err) {
        setError(handleApiError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchMiembro()
  }, [id])

  const actualizarEstado = async ({ activo, puede_volver }) => {
    if (!miembro) return
    setAccionLoading(true)
    try {
      const res = await api.put(`/miembros/${miembro.id}/`, {
        ...miembro,
        activo,
        puede_volver,
      })
      setMiembro(res.data)
    } catch (err) {
      alert(handleApiError(err))
    } finally {
      setAccionLoading(false)
    }
  }

  const desactivarTemporal = () => {
    if (confirm('¿Estás seguro de desactivar temporalmente este miembro?')) {
      actualizarEstado({ activo: false, puede_volver: true })
    }
  }

  const bloquearMiembro = () => {
    if (confirm('¿Seguro que deseas bloquear permanentemente a este miembro?')) {
      actualizarEstado({ activo: false, puede_volver: false })
    }
  }

  const reactivarMiembro = () => {
    if (confirm('¿Deseas reactivar a este miembro?')) {
      actualizarEstado({ activo: true, puede_volver: true })
    }
  }

  if (loading) return <p>Cargando datos del miembro...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!miembro) return <p>Miembro no encontrado.</p>

  return (
    <main style={styles.container}>
      <h2 style={styles.title}>Detalle de miembro</h2>

      <section style={styles.card}>
        <p><strong>Nombre completo:</strong> {miembro.nombre_completo}</p>
        <p><strong>Correo electrónico:</strong> {miembro.email}</p>
        <p><strong>Teléfono:</strong> {miembro.telefono || 'No disponible'}</p>
        <p><strong>País:</strong> {miembro.pais || 'No especificado'}</p>
        <p><strong>Estado:</strong> {estadoLegible(miembro)}</p>
        <p><strong>Fecha de registro:</strong> {new Date(miembro.fecha_registro).toLocaleString()}</p>
      </section>

      <section style={styles.acciones}>
        <h3>Acciones</h3>

        <div style={styles.botones}>
          <button
            style={styles.boton}
            onClick={() => setMostrarModalEdicion(true)}
          >
            ✏️ Editar
          </button>

          <button
            style={styles.boton}
            onClick={() => setMostrarModalSancion(true)}
          >
            ⚠️ Sancionar
          </button>

          {miembro.activo && (
            <>
              <button
                style={{ ...styles.boton, backgroundColor: '#ffcc00' }}
                onClick={desactivarTemporal}
                disabled={accionLoading}
              >
                💤 Desactivar
              </button>

              <button
                style={{ ...styles.boton, backgroundColor: '#ff4d4d' }}
                onClick={bloquearMiembro}
                disabled={accionLoading}
              >
                🚫 Bloquear
              </button>
            </>
          )}

          {!miembro.activo && miembro.puede_volver && (
            <button
              style={{ ...styles.boton, backgroundColor: '#28a745' }}
              onClick={reactivarMiembro}
              disabled={accionLoading}
            >
              ✅ Reactivar
            </button>
          )}
        </div>
      </section>

      <button onClick={() => navigate(-1)} style={styles.volver}>← Volver</button>

      {/* Modales */}
      {mostrarModalEdicion && (
        <ModalMiembro
          visible={mostrarModalEdicion}
          onClose={() => setMostrarModalEdicion(false)}
          miembro={miembro}
          onGuardado={(actualizado) => setMiembro(actualizado)}
        />
      )}

      {mostrarModalSancion && (
        <ModalSancion
          visible={mostrarModalSancion}
          onClose={() => setMostrarModalSancion(false)}
          miembroId={miembro.id}
        />
      )}
    </main>
  )
}

const estadoLegible = (miembro) => {
  if (miembro.activo) return '🟢 Activo'
  if (!miembro.puede_volver) return '🔴 Bloqueado (no puede volver)'
  return '🟠 Inactivo (puede volver)'
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  acciones: {
    marginBottom: '2rem',
  },
  botones: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  boton: {
    padding: '0.7rem 1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  volver: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}
