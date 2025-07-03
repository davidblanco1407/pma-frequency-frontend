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

  return (
    <header style={{ backgroundColor: '#001f3f', color: '#fff', padding: '1rem 0' }}>
      <div style={styles.container}>
        {/* Logo y título */}
        <div style={styles.logoArea}>
          <img
            src="/images/logo-pma.png"
            alt="Logo PMA Frequency"
            style={styles.logo}
          />
          <h1 style={styles.title}>PMA Frequency</h1>
        </div>

        {/* Navegación */}
        <nav style={styles.nav}>
          <Link
  to={
    !isAuthenticated
      ? '/'
      : isAdmin
        ? '/admin/dashboard'
        : '/miembro/perfil'
  }
  style={styles.link}
>
  Inicio
</Link>
<Link to="/about" style={styles.link}>Sobre PMA</Link>



          {!isAuthenticated && (
            <Link to="/login" style={styles.link}>Iniciar sesión</Link>
            
          )}

          {isAuthenticated && (
            <>
              {/* Rol visible */}
              <span
                aria-label={`Rol: ${rol}`}
                style={styles.roleTag}
              >
                {rol}
              </span>

              {/* Navegación por rol */}
              {isAdmin ? (
                <>
                  <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
                  <Link to="/admin/miembros" style={styles.link}>Miembros</Link>
                  <Link to="/admin/solicitudes" style={styles.link}>Solicitudes</Link>
                  <Link to="/admin/sanciones" style={styles.link}>Sanciones</Link>
                </>
              ) : (
                <>
                  <Link to="/miembro/perfil" style={styles.link}>Perfil</Link>
                  <Link to="/miembro/solicitud" style={styles.link}>Nueva Solicitud</Link>
                  <Link to="/miembro/estado-solicitudes" style={styles.link}>Mis Solicitudes</Link>
                </>
              )}

    {/* Agregado: cambiar contraseña */}
    <Link to="/cambiar-password" style={{ color: '#fff' }}>
      Cambiar contraseña
    </Link>

              {/* Cerrar sesión */}
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                aria-label="Cerrar sesión"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

// 🎨 Estilos organizados para limpieza
const styles = {
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
