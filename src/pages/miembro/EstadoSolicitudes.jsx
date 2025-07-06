import { useEffect, useState } from 'react'
import { obtenerSolicitudes } from '../../services/solicitudService'
import { handleApiError } from '../../services/handleApiError'

export default function EstadoSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await obtenerSolicitudes()
        setSolicitudes(res.data)
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
    marginBottom: '2rem',
    textAlign: 'center',
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
