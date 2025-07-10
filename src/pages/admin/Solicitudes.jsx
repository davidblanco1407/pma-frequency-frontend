import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { handleApiError } from '../../services/handleApiError'

export default function PanelSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [respondiendo, setRespondiendo] = useState(null)
  const [respuesta, setRespuesta] = useState('')

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const res = await api.get('/miembros/solicitudes/')
        setSolicitudes(res.data?.results || res.data || [])
      } catch (err) {
        setError(handleApiError(err))
      } finally {
        setLoading(false)
      }
    }

    fetchSolicitudes()
  }, [])

  const enviarRespuesta = async () => {
    if (!respuesta.trim()) return alert('La respuesta no puede estar vacía.')

    try {
      await api.patch(`/miembros/solicitudes/${respondiendo.id}/`, {
        respuesta,
        estado: 'aprobada'
      })
      setSolicitudes(prev =>
        prev.map(s => s.id === respondiendo.id
          ? { ...s, respuesta, estado: 'aprobada' }
          : s
        )
      )
      setRespondiendo(null)
      setRespuesta('')
    } catch (err) {
      alert(handleApiError(err))
    }
  }

  return (
    <main style={styles.container}>
      <h2 style={styles.title}>Solicitudes de corrección</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && solicitudes.length === 0 && (
        <p style={styles.empty}>No hay solicitudes por ahora.</p>
      )}

      <ul style={styles.list}>
        {solicitudes.map((s) => (
          <li key={s.id} style={styles.item}>
            <p><strong>Miembro:</strong> {s.miembro_nombre || 'Desconocido'}</p>
            <p><strong>Fecha:</strong> {new Date(s.fecha).toLocaleString()}</p>
            <p><strong>Descripción:</strong> {s.descripcion}</p>
            <p><strong>Estado:</strong> {renderEstado(s.estado)}</p>
            {s.respuesta && <p><strong>Respuesta:</strong> {s.respuesta}</p>}

            {!s.respuesta && (
              <button
                onClick={() => {
                  setRespondiendo(s)
                  setRespuesta('')
                }}
                style={styles.boton}
              >
                Responder
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Modal de respuesta */}
      {respondiendo && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Responder a la solicitud de {respondiendo.miembro_nombre || 'miembro'}</h3>
            <textarea
              value={respuesta}
              onChange={e => setRespuesta(e.target.value)}
              rows={5}
              style={styles.textarea}
              placeholder="Escribe tu respuesta aquí..."
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={enviarRespuesta} style={styles.boton}>Enviar</button>
              <button onClick={() => setRespondiendo(null)} style={styles.cancelar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

const renderEstado = (estado) => {
  const colores = {
    pendiente: 'orange',
    aprobada: 'green',
    rechazada: 'red',
  }
  return <span style={{ color: colores[estado], fontWeight: 'bold' }}>{estado.toUpperCase()}</span>
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    background: '#fff',
    padding: '1.2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
  boton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  cancelar: {
    padding: '0.5rem 1rem',
    backgroundColor: '#999',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
}
