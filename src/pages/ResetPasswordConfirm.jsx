import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import { handleApiError } from '../services/handleApiError'

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)

    try {
      const res = await api.post(`/reset-password/${uid}/${token}/`, {
        nueva_password: password,
        confirmar_password: confirmar
      })
      setMensaje(res.data?.mensaje || 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.')
    } catch (err) {
      setError(handleApiError(err) || 'No se pudo restablecer la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} aria-labelledby="titulo-reset-confirm">
        <h2 id="titulo-reset-confirm" style={styles.title}>Establecer nueva contraseña</h2>

        <div style={styles.field}>
          <label htmlFor="password">Nueva contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            aria-describedby="password-help"
            autoFocus
          />
          <small id="password-help" style={styles.help}>
            Usa una contraseña segura. Mínimo 8 caracteres recomendados.
          </small>
        </div>

        <div style={styles.field}>
          <label htmlFor="confirmar">Confirmar nueva contraseña</label>
          <input
            id="confirmar"
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
            style={styles.input}
            aria-describedby="confirmar-help"
          />
          <small id="confirmar-help" style={styles.help}>
            Escribe nuevamente la contraseña para confirmar.
          </small>
        </div>

        {error && (
          <div style={styles.error} role="alert" aria-live="assertive">{error}</div>
        )}
        {mensaje && (
          <div style={styles.success} role="status" aria-live="polite">{mensaje}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
        </button>

        <div style={styles.links}>
          <Link to="/login" style={styles.link}>← Volver a iniciar sesión</Link>
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
  links: {
    textAlign: 'center',
    marginTop: '1.5rem',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
}
