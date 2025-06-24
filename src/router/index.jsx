import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'

// Páginas Admin
import Dashboard from '../pages/admin/Dashboard'
import Miembros from '../pages/admin/Miembros'
import Solicitudes from '../pages/admin/Solicitudes'
import Sanciones from '../pages/admin/Sanciones'

// Páginas Miembro
import Perfil from '../pages/miembro/Perfil'
import Solicitud from '../pages/miembro/Solicitud'
import EstadoSolicitudes from '../pages/miembro/EstadoSolicitudes'

// Página 404
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },

      // Admin
      { path: 'admin/dashboard', element: <Dashboard /> },
      { path: 'admin/miembros', element: <Miembros /> },
      { path: 'admin/solicitudes', element: <Solicitudes /> },
      { path: 'admin/sanciones', element: <Sanciones /> },

      // Miembro
      { path: 'miembro/perfil', element: <Perfil /> },
      { path: 'miembro/solicitud', element: <Solicitud /> },
      { path: 'miembro/estado-solicitudes', element: <EstadoSolicitudes /> },

      // Ruta 404
      { path: '*', element: <NotFound /> }
    ]
  }
])
