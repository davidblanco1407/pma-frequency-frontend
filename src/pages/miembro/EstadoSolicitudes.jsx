import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerSolicitudes } from '../../services/solicitudService'
import { handleApiError } from '../../services/handleApiError'

export default function EstadoSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await obtenerSolicitudes()
        setSolicitudes(res.data.results || [])
      } catch (err) {
        setError(handleApiError(err) || 'No se pudieron cargar tus solicitudes.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main style={styles.container}>
      <h2 style={styles.title}>Mis solicitudes de corrección</h2>

      <div style={styles.botonContainer}>
        <button
          onClick={() => navigate('/miembro/solicitud')}
          style={styles.boton}
          aria-label="Crear nueva solicitud de corrección"
        >
          ➕ Nueva solicitud
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Cargando...</p>}

      {!loading && solicitudes.length === 0 && (
        <p style={styles.empty}>No has enviado ninguna solicitud todavía.</p>
      )}

      <ul style={styles.list}>
        {solicitudes.map((s) => (
          <li key={s.id} style={styles.item}>
            <p><strong>Fecha:</strong> {new Date(s.fecha).toLocaleString()}</p>
            <p><strong>Estado:</strong> {renderEstado(s.estado)}</p>
            <p><strong>Descripción:</strong> {s.descripcion}</p>
            {s.respuesta && (
              <p><strong>Respuesta del admin:</strong> {s.respuesta}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

const renderEstado = (estado) => {
  const colores = {
    pendiente: 'orange',
    aprobada: 'green',
    rechazada: 'red',
  }

  const capitalizado = estado.charAt(0).toUpperCase() + estado.slice(1)

  return <span style={{ color: colores[estado], fontWeight: 'bold' }}>{capitalizado}</span>
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  botonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem',
  },
  boton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem',
  },
  item: {
    background: '#fff',
    padding: '1.2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
}
