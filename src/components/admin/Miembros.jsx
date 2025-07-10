import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { handleApiError } from '../../services/handleApiError'
import ModalMiembro from './ModalMiembro'

export default function Miembros({ reloadTrigger }) {
  const navigate = useNavigate()

  const [filtros, setFiltros] = useState({
    nombre: '',
    email: '',
    telefono: '',
    activo: '',
    puede_volver: '',
    fecha_desde: '',
    fecha_hasta: '',
  })

  const [miembros, setMiembros] = useState([])
  const [paginaActual, setPaginaActual] = useState('/miembros/miembros/')
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)

  // 🔧 Mejora: lógica de filtros más precisa
  const hayFiltros = Object.values(filtros).some(val => val && String(val).trim().length > 0)

  // 🔥 Cargar miembros siempre que reloadTrigger cambie
  useEffect(() => {
    cargarMiembros()
  }, [reloadTrigger])

  const cargarMiembros = async (url = '/miembros/miembros/') => {
    setLoading(true)
    try {
      const res = await api.get(url)
      setMiembros(res.data?.results ?? [])
      setNext(res.data?.next ?? null)
      setPrevious(res.data?.previous ?? null)
      setPaginaActual(url)
    } catch (err) {
      setError(handleApiError(err))
      setMiembros([])
    } finally {
      setLoading(false)
    }
  }

  const aplicarFiltro = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/miembros/filtrar/', filtros)
      setMiembros(res.data ?? [])
      setNext(null)
      setPrevious(null)
    } catch (err) {
      setError(handleApiError(err))
      setMiembros([])
    } finally {
      setLoading(false)
    }
  }

  const limpiarFiltro = () => {
    setFiltros({
      nombre: '',
      email: '',
      telefono: '',
      activo: '',
      puede_volver: '',
      fecha_desde: '',
      fecha_hasta: '',
    })
    cargarMiembros()
  }

  const onCreado = (nuevo) => {
    setMostrarModal(false)
    if (!hayFiltros) {
      cargarMiembros()
    } else {
      setMiembros(prev => [nuevo, ...(prev ?? [])])
    }
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Gestión de Miembros</h1>

      <form onSubmit={aplicarFiltro} aria-label="Formulario de filtro de miembros">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Campo label="Nombre" id="nombre" value={filtros.nombre} onChange={val => setFiltros(f => ({ ...f, nombre: val }))} />
          <Campo label="Correo" id="email" value={filtros.email} onChange={val => setFiltros(f => ({ ...f, email: val }))} />
          <Campo label="Teléfono" id="telefono" value={filtros.telefono} onChange={val => setFiltros(f => ({ ...f, telefono: val }))} />
          <CampoSelect label="Activo" id="activo" value={filtros.activo} onChange={val => setFiltros(f => ({ ...f, activo: val }))} />
          <CampoSelect label="¿Puede volver?" id="puede_volver" value={filtros.puede_volver} onChange={val => setFiltros(f => ({ ...f, puede_volver: val }))} />
          <Campo label="Desde (fecha)" id="fecha_desde" type="date" value={filtros.fecha_desde} onChange={val => setFiltros(f => ({ ...f, fecha_desde: val }))} />
          <Campo label="Hasta (fecha)" id="fecha_hasta" type="date" value={filtros.fecha_hasta} onChange={val => setFiltros(f => ({ ...f, fecha_hasta: val }))} />
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button type="submit" style={styles.boton}>Aplicar filtro</button>
          <button type="button" onClick={limpiarFiltro} style={styles.botonSecundario}>Limpiar</button>
        </div>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Miembros</h2>

      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setMostrarModal(true)}
          style={{ ...styles.boton, backgroundColor: '#17a2b8' }}
        >
          + Nuevo miembro
        </button>
      </div>

      {mostrarModal && (
        <ModalMiembro
          visible={mostrarModal}
          onClose={() => setMostrarModal(false)}
          modo="crear"
          onCreado={onCreado}
        />
      )}

      {loading ? (
        <p>Cargando miembros...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <table aria-label="Tabla de miembros" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Correo</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(miembros ?? []).length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>
                    No se encontraron miembros con los criterios actuales.
                  </td>
                </tr>
              ) : (
                miembros.map((m) => (
                  <tr key={m.id}>
                    <td style={styles.td}>{m.nombre_completo}</td>
                    <td style={styles.td}>{m.email}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => navigate(`/admin/miembros/${m.id}`)}
                        aria-label={`Ver detalle de ${m.nombre_completo}`}
                        style={styles.botonAccion}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!hayFiltros && (
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              {previous ? <button onClick={() => cargarMiembros(previous)} style={styles.boton}>← Anterior</button> : <span />}
              {next && <button onClick={() => cargarMiembros(next)} style={styles.boton}>Siguiente →</button>}
            </div>
          )}
        </>
      )}
    </main>
  )
}

// Campos reutilizables
function Campo({ label, id, type = 'text', value, onChange }) {
  return (
    <div>
      <label htmlFor={id}><strong>{label}</strong></label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem' }}
      />
    </div>
  )
}

function CampoSelect({ label, id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}><strong>{label}</strong></label>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem' }}
      >
        <option value="">-- Todos --</option>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>
    </div>
  )
}

const styles = {
  th: {
    background: '#001f3f',
    color: '#fff',
    padding: '0.8rem',
    textAlign: 'left'
  },
  td: {
    padding: '0.8rem',
    borderBottom: '1px solid #ddd'
  },
  boton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  botonSecundario: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  botonAccion: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
}
