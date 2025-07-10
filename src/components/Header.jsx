import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const rol = isAdmin ? 'Admin' : 'Miembro'
  const rutaInicio = !isAuthenticated ? '/' : isAdmin ? '/admin/dashboard' : '/miembro/perfil'

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo y título */}
        <Link to={rutaInicio} style={styles.logoArea}>
          <img
            src="/images/logo-pma.png"
            alt="Logo PMA Frequency"
            style={styles.logo}
          />
          <h1 style={styles.title}>PMA Frequency</h1>
        </Link>

        {/* Navegación */}
        <nav style={styles.nav}>
          <Link to={rutaInicio} style={styles.link}>Inicio</Link>
          <Link to="/about" style={styles.link}>Sobre PMA</Link>

          {!isAuthenticated && (
            <Link to="/login" style={styles.link}>Iniciar sesión</Link>
          )}

          {isAuthenticated && (
            <>
              {/* Rol */}
              <span aria-label={`Rol: ${rol}`} style={styles.roleTag}>{rol}</span>

              {/* Menú por rol */}
              {isAdmin ? (
                <>
                  <Link to="/admin/solicitudes" style={styles.link}>Solicitudes</Link>
                </>
              ) : (
                <>
                  <Link to="/miembro/estado-solicitudes" style={styles.link}>Mis Solicitudes</Link>
                </>
              )}

              {/* Cambiar contraseña */}
              <Link to="/cambiar-password" style={styles.link}>Cambiar contraseña</Link>

              {/* Cerrar sesión */}
              <button onClick={handleLogout} style={styles.logoutButton}>
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: '#001f3f',
    color: '#fff',
    padding: '1rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    textDecoration: 'none',
    color: '#fff',
  },
  logo: {
    height: 50,
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
  },
  roleTag: {
    padding: '0.3rem 0.6rem',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#ffcccb',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}
