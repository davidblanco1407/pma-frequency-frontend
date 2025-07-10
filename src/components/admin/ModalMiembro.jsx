import { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { getNames } from 'country-list'
import { api } from '../../services/api'
import { handleApiError } from '../../services/handleApiError'

export default function ModalMiembro({ visible, onClose, miembroActual, onSuccess }) {
  const esEdicion = !!miembroActual

  const [form, setForm] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    pais: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [paises, setPaises] = useState([])

  // Cargar lista de países + precargar datos si estamos editando
  useEffect(() => {
    setPaises(getNames())

    if (visible) {
      if (esEdicion) {
        setForm({
          nombre_completo: miembroActual?.nombre_completo || '',
          email: miembroActual?.email || '',
          telefono: miembroActual?.telefono || '',
          pais: miembroActual?.pais || '',
        })
      } else {
        setForm({
          nombre_completo: '',
          email: '',
          telefono: '',
          pais: '',
        })
      }
      setError('')
    }
  }, [visible, miembroActual])

  if (!visible) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleTelefonoChange = (value) => {
    setForm(prev => ({ ...prev, telefono: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = esEdicion
        ? `/miembros/miembros/${miembroActual.id}/`
        : '/miembros/miembros/'

      const method = esEdicion ? api.put : api.post
      const res = await method(endpoint, form)

      onSuccess?.(res.data)
      onClose()
    } catch (err) {
      setError(handleApiError(err) || 'No se pudo guardar el miembro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-titulo" style={styles.overlay}>
      <div style={styles.modal}>
        <h2 id="modal-titulo" style={styles.title}>
          {esEdicion ? 'Editar miembro' : 'Registrar nuevo miembro'}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Nombre */}
          <div style={styles.group}>
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre_completo"
              type="text"
              value={form.nombre_completo}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          {/* Correo */}
          <div style={styles.group}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
              disabled={esEdicion}
            />
            {esEdicion && (
              <small style={styles.help}>
                El correo no puede modificarse.
              </small>
            )}
          </div>

          {/* Teléfono */}
          <div style={styles.group}>
            <label htmlFor="telefono">Teléfono</label>
            <PhoneInput
              id="telefono"
              name="telefono"
              defaultCountry="CO"
              value={form.telefono}
              onChange={handleTelefonoChange}
              style={styles.phone}
              required
            />
          </div>

          {/* País */}
          <div style={styles.group}>
            <label htmlFor="pais">País</label>
            <select
              id="pais"
              name="pais"
              value={form.pais}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Selecciona un país</option>
              {paises.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && <div style={styles.error}>{error}</div>}

          {/* Botones */}
          <div style={styles.actions}>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Registrar'}
            </button>
            <button type="button" onClick={onClose} style={styles.cancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    background: '#fff',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: '1.6rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.7rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  phone: {
    fontSize: '1rem',
    borderRadius: '5px',
  },
  help: {
    marginTop: '0.3rem',
    fontSize: '0.85rem',
    color: '#555',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  button: {
    flex: 1,
    padding: '0.8rem',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancel: {
    flex: 1,
    padding: '0.8rem',
    backgroundColor: '#ccc',
    color: '#333',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}
