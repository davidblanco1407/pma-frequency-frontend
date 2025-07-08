import { useState, useEffect } from 'react'
import Estadisticas from '../../components/admin/Estadisticas'
import Miembros from '../../components/admin/Miembros'
import ModalMiembro from '../../components/admin/ModalMiembro'
import { api } from '../../services/api'
import { handleApiError } from '../../services/handleApiError'

export default function Dashboard() {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [reloadTrigger, setReloadTrigger] = useState(Date.now())
  const [estadisticas, setEstadisticas] = useState(null)
  const [error, setError] = useState('')

  const recargarMiembros = () => setReloadTrigger(Date.now())

  // Cargar estadísticas desde el backend
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const res = await api.get('/miembros/')
        const lista = res.data.results || []

        const conteo = {
          activos: lista.filter(m => m.activo).length,
          inactivos: lista.filter(m => !m.activo && m.puede_volver).length,
          bloqueados: lista.filter(m => !m.activo && !m.puede_volver).length
        }

        setEstadisticas(conteo)
      } catch (err) {
        setError(handleApiError(err))
      }
    }

    fetchEstadisticas()
  }, [reloadTrigger])

  return (
    <main style={styles.contenedor}>
      <h1 style={styles.titulo}>Panel de administración</h1>

      {/* Botón para registrar nuevo miembro */}
      <div style={styles.contenedorBoton}>
        <button
          style={styles.botonAgregar}
          onClick={() => setMostrarModal(true)}
          aria-label="Registrar nuevo miembro"
        >
          ➕ Registrar nuevo miembro
        </button>
      </div>

      {/* Modal de registro de nuevo miembro */}
      {mostrarModal && (
        <ModalMiembro
          onClose={() => setMostrarModal(false)}
          onSuccess={() => {
            setMostrarModal(false)
            recargarMiembros()
          }}
        />
      )}

      {/* Estadísticas */}
      <section style={styles.seccion}>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <Estadisticas datos={estadisticas} />
        )}
      </section>

      <hr style={{ margin: '2rem 0' }} />

      {/* Miembros con filtros, tabla y paginación */}
      <section style={styles.seccion}>
        <Miembros reloadTrigger={reloadTrigger} />
      </section>
    </main>
  )
}

const styles = {
  contenedor: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  titulo: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  contenedorBoton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
  },
  botonAgregar: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  seccion: {
    marginBottom: '2rem',
  },
}
