import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth()

  if (loading) return <p>Cargando...</p>
  if (!isAdmin) return <Navigate to="/" replace />

  return children
}
