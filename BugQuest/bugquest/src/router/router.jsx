import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/layout/Layout'
import Dashboard from '../pages/Dashboard'
import ErrorLogs from '../pages/ErrorLogs'
import ErrorLogDetail from '../pages/ErrorLogDetail'
import NewErrorLog from '../pages/NewErrorLog'
import Quests from '../pages/Quests'
import Stats from '../pages/Stats'
import Settings from '../pages/Settings'
import EditErrorLog from '../pages/EditErrorLog'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'logs',
        element: <ErrorLogs />,
      },
      {
        path: 'logs/new',
        element: <NewErrorLog />,
      },
      {
        path: 'logs/:id',
        element: <ErrorLogDetail />,
      },
      {
        path: 'quests',
        element: <Quests />,
      },
      {
        path: 'stats',
        element: <Stats />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'logs/:id/edit',
        element: <EditErrorLog />,
      },
    ],
  },
])

export default router