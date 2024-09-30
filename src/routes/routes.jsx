import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/Sidebar'
import Packages from '../components/Packages'
import Booking from '../components/Booking'

const AppRoutes = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/packages' element={<Packages />} />
                <Route path='/bookings' element={<Booking/>}/>

            </Routes>
        </div>
    )
}

export default AppRoutes