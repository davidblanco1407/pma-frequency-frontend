import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que buscaste no existe.</p>
      <Link to="/" style={{ color: '#007bff' }}>Volver al inicio</Link>
    </div>
  )
}
