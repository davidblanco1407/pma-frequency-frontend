import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enviarSolicitud } from '../../services/solicitudService'
import { handleApiError } from '../../services/handleApiError'

export default function Solicitud() {
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!descripcion.trim()) {
      setError('La descripción no puede estar vacía.')
      return
    }

    setLoading(true)

    try {
      await enviarSolicitud({ descripcion })
      setMensaje('Solicitud enviada correctamente.')
      setDescripcion('')

      // ⏳ Pequeña pausa opcional antes de redirigir (solo si quieres que vea el mensaje)
      setTimeout(() => {
        navigate('/miembro/estado-solicitudes')
      }, 1000)

    } catch (err) {
      setError(handleApiError(err) || 'No se pudo enviar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} aria-labelledby="titulo-solicitud">
        <h2 id="titulo-solicitud" style={styles.title}>Enviar solicitud de corrección</h2>

        <div style={styles.field}>
          <label htmlFor="descripcion">¿Qué deseas corregir?</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={6}
            required
            style={styles.textarea}
            aria-describedby="descripcion-help"
          />
          <small id="descripcion-help" style={styles.help}>
            Explica con claridad qué información necesitas modificar o corregir. Sé lo más detallado posible.
          </small>
        </div>

        {error && <div style={styles.error} role="alert">{error}</div>}
        {mensaje && <div style={styles.success} role="status">{mensaje}</div>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Enviando...' : 'Enviar solicitud'}
        </button>
      </form>
    </main>
  )
}

const styles = {
  container: {
    padding: '3rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '80vh',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  field: {
    marginBottom: '1.5rem',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    marginTop: '0.4rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
  },
  help: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '0.3rem',
  },
  button: {
    width: '100%',
    padding: '0.9rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
}
