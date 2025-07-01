import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { handleApiError } from '../services/handleApiError'

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
      const mensaje = handleApiError(err) || 'No se pudo iniciar sesión'
      setError(mensaje)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Iniciar sesión</h2>

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.7rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Ingresando...' : 'Entrar'}
      </button>
    </form>
  )
}
