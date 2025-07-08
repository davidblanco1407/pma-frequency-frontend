import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

import Dashboard from '../pages/admin/Dashboard'
import DetalleMiembro from '../components/admin/DetalleMiembro'

import Perfil from '../pages/miembro/Perfil'
import Solicitud from '../pages/miembro/Solicitud'
import EstadoSolicitudes from '../pages/miembro/EstadoSolicitudes'

import PrivateRoute from '../components/PrivateRoute'
import AdminRoute from '../components/AdminRoute'
import About from '../pages/About'
import RecuperarPassword from '../pages/RecuperarPassword'
import CambiarPassword from '../pages/CambiarPassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'about', element: <About /> },
      { path: 'recuperar-password', element: <RecuperarPassword /> },
      { path: 'reset-password/:uid/:token', element: <RecuperarPassword /> },

      // ---------------- ADMIN ----------------
      {
        path: 'admin/dashboard',
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        )
      },
      {
        path: 'admin/miembros/:id',
        element: (
          <AdminRoute>
            <DetalleMiembro />
          </AdminRoute>
        )
      },

      // ---------------- MIEMBRO ----------------
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

      // ---------------- GENERAL ----------------
      {
        path: 'cambiar-password',
        element: (
          <PrivateRoute>
            <CambiarPassword />
          </PrivateRoute>
        )
      },

      { path: '*', element: <NotFound /> }
    ]
  }
])
