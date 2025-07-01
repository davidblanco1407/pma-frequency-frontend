import { createContext, useContext, useState, useEffect } from 'react'
import { obtenerMiPerfil } from '../services/miembroService'
import { login as loginService } from '../services/authService'

// Creamos el contexto
const AuthContext = createContext()

// Proveedor del contexto: envuelve tu app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)       // Info del usuario
  const [loading, setLoading] = useState(true) // Para saber si estamos cargando el perfil

  // Al iniciar la app, cargamos el usuario si hay token
  useEffect(() => {
    const access = localStorage.getItem('access')
    if (access) {
      obtenerMiPerfil()
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // Función para iniciar sesión
  const login = async (credentials) => {
    const res = await loginService(credentials)
    localStorage.setItem('access', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)
    const perfil = await obtenerMiPerfil()
    localStorage.setItem('user', JSON.stringify(perfil.data))
    setUser(perfil.data)
  }

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.is_staff || false,
      isSuperUser: user?.is_superuser || false,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar el contexto desde cualquier parte
export const useAuth = () => useContext(AuthContext)
