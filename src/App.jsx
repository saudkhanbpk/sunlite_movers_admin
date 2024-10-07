import React from 'react'
import AppRoutes from './routes/routes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
    <ToastContainer />
      <AppRoutes />
    </div>
  )
}

export default App