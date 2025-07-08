import { useState } from 'react'
import { api } from '../../services/api'
import { handleApiError } from '../../services/handleApiError'

export default function ModalSancion({ visible, onClose, miembroId, nombreMiembro, onSuccess }) {
  const [motivo, setMotivo] = useState('')
  const [duracion, setDuracion] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!visible) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        motivo,
        miembro: miembroId,
        duracion_dias: duracion ? parseInt(duracion, 10) : null,
      }

      await api.post('/sanciones/', payload)
      onSuccess?.()  // si se definió onSuccess, se ejecuta
      onClose()
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="titulo-modal-sancion">
      <div style={styles.modal}>
        <h2 id="titulo-modal-sancion" style={{ marginBottom: '1rem' }}>
          Nueva sanción para {nombreMiembro}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label htmlFor="motivo"><strong>Motivo de la sanción</strong></label>
            <textarea
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
              rows={4}
              style={styles.textarea}
              aria-describedby="motivo-help"
            />
            <small id="motivo-help" style={styles.help}>
              Describe claramente la razón de la sanción.
            </small>
          </div>

          <div style={styles.field}>
            <label htmlFor="duracion"><strong>Duración (en días)</strong> <em>(opcional)</em></label>
            <input
              id="duracion"
              type="number"
              min="1"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              style={styles.input}
              aria-describedby="duracion-help"
            />
            <small id="duracion-help" style={styles.help}>
              Si no se especifica, la sanción será indefinida.
            </small>
          </div>

          {error && <div role="alert" style={styles.error}>{error}</div>}

          <div style={styles.actions}>
            <button type="submit" disabled={loading} style={styles.boton}>
              {loading ? 'Guardando...' : 'Aplicar sanción'}
            </button>
            <button type="button" onClick={onClose} style={styles.cancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
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
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  },
  field: {
    marginBottom: '1.5rem',
  },
  textarea: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  help: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '0.3rem',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  boton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelar: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}
