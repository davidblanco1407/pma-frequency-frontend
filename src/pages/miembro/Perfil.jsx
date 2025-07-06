import { useEffect, useState } from 'react'
import { obtenerMiPerfil } from '../../services/miembroService'
import { Link } from 'react-router-dom'
import { handleApiError } from '../../services/handleApiError'

export default function Perfil() {
  const [miembro, setMiembro] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await obtenerMiPerfil()
        setMiembro(res.data)
      } catch (err) {
        setError(handleApiError(err) || 'No se pudo cargar tu perfil.')
      }
    }

    fetchPerfil()
  }, [])

  if (error) {
    return <p style={styles.error}>{error}</p>
  }

  if (!miembro) {
    return <p style={styles.loading}>Cargando perfil...</p>
  }

  const estado = miembro.activo
    ? 'Activo'
    : miembro.puede_volver
    ? 'Inactivo (puede volver)'
    : 'Bloqueado permanentemente'

  const estadoColor = miembro.activo ? 'green' : miembro.puede_volver ? 'orange' : 'red'

  return (
    <main style={styles.container}>
      <h2 style={styles.title}>Mi perfil</h2>

      <section aria-labelledby="info-personal" style={styles.card}>
        <h3 id="info-personal" style={styles.subtitle}>Información personal</h3>
        <p><strong>Nombre:</strong> {miembro.nombre_completo}</p>
        <p><strong>Email:</strong> {miembro.email}</p>
        <p><strong>Teléfono:</strong> {miembro.telefono}</p>
      </section>

      <section aria-labelledby="estado-cuenta" style={styles.card}>
        <h3 id="estado-cuenta" style={styles.subtitle}>Estado de tu cuenta</h3>
        <p style={{ color: estadoColor, fontWeight: 'bold' }}>{estado}</p>
      </section>

      <section style={styles.links}>
        <Link to="/cambiar-password" style={styles.link}>
          Cambiar contraseña
        </Link>

        <Link to="/miembro/solicitud" style={styles.link}>
          Enviar solicitud de corrección
        </Link>

        <Link to="/miembro/estado-solicitudes" style={styles.link}>
          Ver estado de mis solicitudes
        </Link>
      </section>
    </main>
  )
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem',
  },
  subtitle: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'center',
    marginTop: '2rem',
  },
  link: {
    padding: '0.8rem',
    background: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    padding: '2rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontStyle: 'italic',
  },
}
