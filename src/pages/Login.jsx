import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { handleApiError } from '../services/handleApiError'

// ... importaciones
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login({ username, password })
      const user = JSON.parse(localStorage.getItem('user'))
      if (user?.is_superuser || user?.is_staff) {
        navigate('/admin/dashboard')
      } else {
        navigate('/miembro/perfil')
      }
    } catch (err) {
      const mensaje = handleApiError(err) || 'No se pudo iniciar sesión. Verifica tus datos.'
      setError(mensaje)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} aria-labelledby="titulo-login">
        <h2 id="titulo-login" style={styles.title}>Iniciar sesión</h2>

        <div style={styles.field}>
        <label htmlFor="username">Nombre de usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
          style={styles.input}
          aria-describedby="username-help"
        />
        <small id="username-help" style={styles.help}>
          Ingresa tu nombre de usuario asignado por el sistema.
        </small>
      </div>

        <div style={styles.field}>
      <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          aria-describedby="password-help"
        />
        <small id="password-help" style={styles.help}>
          Usa tu contraseña actual. Puedes restablecerla si la olvidaste.
        </small>
      </div>

        {error && (
          <div style={styles.error} role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>

        <div style={styles.links}>
          <Link to="/recuperar-password" style={styles.link}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#777' }}>
          ¿Aún no tienes cuenta? Contacta con un administrador de PMA.
        </p>
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
  links: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  help: {
  display: 'block',
  fontSize: '0.85rem',
  color: '#666',
  marginTop: '0.3rem',
}
}
