import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { handleApiError } from '../../services/handleApiError'
import { FaUserCheck, FaUserClock, FaUserSlash } from 'react-icons/fa'

export default function Estadisticas() {
  const [datos, setDatos] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const res = await api.get('/miembros/estadisticas/')
        setDatos(res.data)
      } catch (err) {
        setError(handleApiError(err))
      }
    }

    cargarEstadisticas()
  }, [])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!datos) return <p>Cargando estadísticas...</p>

  return (
    <section aria-label="Estadísticas de miembros" style={styles.contenedor}>
      <TarjetaEstadistica
        icono={<FaUserCheck size={28} color="#28a745" />}
        label="Activos"
        valor={datos.activos}
      />
      <TarjetaEstadistica
        icono={<FaUserClock size={28} color="#ffc107" />}
        label="Inactivos"
        valor={datos.inactivos}
      />
      <TarjetaEstadistica
        icono={<FaUserSlash size={28} color="#dc3545" />}
        label="Bloqueados"
        valor={datos.bloqueados}
      />
    </section>
  )
}

function TarjetaEstadistica({ icono, label, valor }) {
  return (
    <div role="region" aria-label={`Miembros ${label}`} style={styles.tarjeta}>
      <div style={styles.icono}>{icono}</div>
      <h4 style={styles.titulo}>{label}</h4>
      <p style={styles.valor}>{valor}</p>
    </div>
  )
}

const styles = {
  contenedor: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  tarjeta: {
    flex: 1,
    minWidth: '200px',
    padding: '1.2rem',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
    textAlign: 'center',
    transition: 'transform 0.2s ease',
  },
  icono: {
    marginBottom: '0.5rem',
  },
  titulo: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0.5rem 0',
    color: '#333',
  },
  valor: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#007bff',
  },
}
