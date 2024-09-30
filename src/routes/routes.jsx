import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/Sidebar'

const AppRoutes = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <Routes>
                <Route path='/' element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default AppRoutes