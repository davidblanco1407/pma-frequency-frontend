import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { handleApiError } from '../services/handleApiError'
import { useAuth } from '../context/AuthContext'

export default function CambiarPassword() {
  const [actual, setActual] = useState('')
  const [nueva, setNueva] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')

    if (nueva !== confirmar) {
      setError('Las contraseñas nuevas no coinciden.')
      return
    }

    setLoading(true)

    try {
      const res = await api.post('/miembros/cambiar-password/', {
        password_actual: actual,
        nueva_password: nueva,
        confirmar_password: confirmar
      })

      setMensaje(res.data?.mensaje || 'Contraseña cambiada correctamente.')
      setActual('')
      setNueva('')
      setConfirmar('')

      // Redirige a página de inicio según el rol
      setTimeout(() => {
        navigate(isAdmin ? '/admin/dashboard' : '/miembro/perfil')
      }, 1500)

    } catch (err) {
      setError(handleApiError(err) || 'No se pudo cambiar la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form} aria-labelledby="titulo-cambiar-pass">
        <h2 id="titulo-cambiar-pass" style={styles.title}>Cambiar contraseña</h2>

        <div style={styles.field}>
          <label htmlFor="actual">Contraseña actual</label>
          <input
            id="actual"
            type="password"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            required
            style={styles.input}
            aria-describedby="actual-help"
            autoFocus
          />
          <small id="actual-help" style={styles.help}>
            Ingresa tu contraseña actual para verificar identidad.
          </small>
        </div>

        <div style={styles.field}>
          <label htmlFor="nueva">Nueva contraseña</label>
          <input
            id="nueva"
            type="password"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            required
            style={styles.input}
            aria-describedby="nueva-help"
          />
          <small id="nueva-help" style={styles.help}>
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
            Vuelve a escribir la nueva contraseña.
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
          {loading ? 'Cambiando...' : 'Guardar contraseña'}
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
}
