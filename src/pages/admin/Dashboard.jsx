import { useState } from 'react'
import Estadisticas from '../../components/admin/Estadisticas'
import Miembros from '../../components/admin/Miembros'

export default function Dashboard() {
  const [reloadTrigger, setReloadTrigger] = useState(Date.now())

  const recargarMiembros = () => setReloadTrigger(Date.now())

  return (
    <main style={styles.contenedor}>
      <h1 style={styles.titulo}>Panel de administración</h1>

      {/* Estadísticas */}
      <section style={styles.seccion}>
        <Estadisticas />
      </section>

      <hr style={{ margin: '2rem 0' }} />

      {/* Miembros con filtros, tabla y paginación */}
      <section style={styles.seccion}>
        <Miembros reloadTrigger={reloadTrigger} />
      </section>
    </main>
  )
}

const styles = {
  contenedor: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  titulo: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  seccion: {
    marginBottom: '2rem',
  },
}
