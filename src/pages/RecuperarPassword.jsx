import { useState } from 'react'
import { api } from '../services/api'
import { handleApiError } from '../services/handleApiError'

export default function RecuperarPassword() {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')
    setError('')

    try {
      const res = await api.post('/enviar-reset-password/', { email })
      setMensaje(res.data?.mensaje || 'Correo enviado con instrucciones para restablecer tu contraseña.')
    } catch (err) {
      setError(handleApiError(err) || 'No se pudo procesar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} aria-labelledby="titulo-reset">
        <h2 id="titulo-reset" style={styles.title}>Recuperar contraseña</h2>

        <div style={styles.field}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          style={styles.input}
          aria-describedby="email-help"
        />
        <small id="email-help" style={styles.help}>
          Asegúrate de ingresar el correo registrado en el sistema.
        </small>
      </div>

        {error && (
          <div style={styles.error} role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        {mensaje && (
          <div style={styles.success} role="status" aria-live="polite">
            {mensaje}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        <div style={styles.links}>
  <a href="/" style={styles.link}>← Volver al inicio</a>
</div>
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
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    marginBottom: '2rem',
    textAlign: 'center',
    fontSize: '1.8rem',
  },
  field: {
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    marginTop: '0.4rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
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
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  help: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '0.3rem',
  },
  links: {
    textAlign: 'center',
    marginTop: '1rem',
  },
}
