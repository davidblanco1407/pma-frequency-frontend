import PropTypes from 'prop-types'

export default function Estadisticas({ datos }) {
  if (!datos) {
    return <p>Cargando estadísticas...</p>
  }

  return (
    <div style={styles.contenedor}>
      <div style={styles.tarjeta}>
        <h3>Activos</h3>
        <p style={styles.numero}>{datos.activos}</p>
      </div>
      <div style={styles.tarjeta}>
        <h3>Inactivos</h3>
        <p style={styles.numero}>{datos.inactivos}</p>
      </div>
      <div style={styles.tarjeta}>
        <h3>Bloqueados</h3>
        <p style={styles.numero}>{datos.bloqueados}</p>
      </div>
    </div>
  )
}

Estadisticas.propTypes = {
  datos: PropTypes.shape({
    activos: PropTypes.number,
    inactivos: PropTypes.number,
    bloqueados: PropTypes.number
  })
}

const styles = {
  contenedor: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    marginBottom: '2rem'
  },
  tarjeta: {
    flex: 1,
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  numero: {
    fontSize: '2rem',
    margin: 0,
    color: '#007bff'
  }
}
