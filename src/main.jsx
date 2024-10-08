import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import RootLayout from './routes/rootLayout/RootLayout.jsx';
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home.jsx'
import Loader from './components/loader/Loader.jsx'
import { PrivateRoute } from './routes/rootLayout/PrivateRoute.jsx'
import PrivateLayout from './routes/rootLayout/PrivateLayout.jsx'
import Profile from './pages/Profile.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <Loader />
      <RouterProvider router={router} />
    </StrictMode>
    <Toaster position="top-right" />
  </Provider>
)
