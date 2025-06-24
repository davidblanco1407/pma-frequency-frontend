import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{ background: '#001f3f', color: '#fff', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src="/images/logo-pma.png" alt="Logo PMA Frequency" style={{ height: 50 }} />
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>PMA Frequency</h1>

        <nav style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Inicio</Link>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Iniciar sesión</Link>
        </nav>
      </div>
    </header>
  )
}
