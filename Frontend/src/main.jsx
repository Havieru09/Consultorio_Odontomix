import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import router from './router'
import { DentalProvider } from './context/DentalProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DentalProvider>
      <RouterProvider router={router} />
    </DentalProvider>
  </React.StrictMode>,
)
