import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

import Dashboard from '../pages/admin/Dashboard'
import Miembros from '../pages/admin/Miembros'
import Solicitudes from '../pages/admin/Solicitudes'
import Sanciones from '../pages/admin/Sanciones'

import Perfil from '../pages/miembro/Perfil'
import Solicitud from '../pages/miembro/Solicitud'
import EstadoSolicitudes from '../pages/miembro/EstadoSolicitudes'

import PrivateRoute from '../components/PrivateRoute'
import AdminRoute from '../components/AdminRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },

      {
        path: 'admin/dashboard',
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        )
      },
      {
        path: 'admin/miembros',
        element: (
          <AdminRoute>
            <Miembros />
          </AdminRoute>
        )
      },
      {
        path: 'admin/solicitudes',
        element: (
          <AdminRoute>
            <Solicitudes />
          </AdminRoute>
        )
      },
      {
        path: 'admin/sanciones',
        element: (
          <AdminRoute>
            <Sanciones />
          </AdminRoute>
        )
      },

      {
        path: 'miembro/perfil',
        element: (
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        )
      },
      {
        path: 'miembro/solicitud',
        element: (
          <PrivateRoute>
            <Solicitud />
          </PrivateRoute>
        )
      },
      {
        path: 'miembro/estado-solicitudes',
        element: (
          <PrivateRoute>
            <EstadoSolicitudes />
          </PrivateRoute>
        )
      },

      { path: '*', element: <NotFound /> }
    ]
  }
])
