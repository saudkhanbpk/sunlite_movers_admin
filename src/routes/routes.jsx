import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/Sidebar'
import { FaBars } from 'react-icons/fa'
import { IoMdCloseCircle } from "react-icons/io";
import Booking from '../components/Booking'
import Agents from '../components/Agents'
import Guides from '../components/Guides'
import Drivers from '../components/Drivers'
import Packages from '../components/Packages'
import AddPackage from '../components/AddPackage'
import AddLocation from '../components/AddLocation'
import Calendar from '../components/Calendar'
import AddNewAgents from '../components/AddNewAgents'
import AddNewGuides from '../components/AddNewGuides'
import AddNewDrivers from '../components/AddNewDrivers'
import PackagesDetails from '../components/PackagesDetails'
import UpdatePackage from '../components/UpdatePackage'
import BookedServices from '../components/BookedServices'
import ServiceList from '../components/ServiceList'
import AddServices from '../components/AddServices'

const AppRoutes = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="block md:hidden p-4">
                <button onClick={() => setIsOpen(!isOpen)} className="text-[#000000]">
                    {isOpen ? <><IoMdCloseCircle size={24} /></> : <><FaBars size={24} /></>}
                </button>
            </div>
            <div className='flex overflow-y-hidden h-screen'>
                <Sidebar isOpen={isOpen} />
                <div className='flex-1 h-screen overflow-y-scroll'>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/booking' element={<Booking />} />
                        <Route path='/calendar' element={<Calendar />} />
                        <Route path='/agents' element={<Agents />} />
                        <Route path='/guides' element={<Guides />} />
                        <Route path='/drivers' element={<Drivers />} />
                        <Route path='/add_package' element={<AddPackage />} />
                        <Route path='/location' element={<AddLocation />} />
                        <Route path='/add_agent' element={<AddNewAgents />} />
                        <Route path='/add_guides' element={<AddNewGuides />} />
                        <Route path='/add_drivers' element={<AddNewDrivers />} />
                        <Route path='/packages' element={<Packages />} />
                        <Route path='/package-details' element={<PackagesDetails />} />
                        <Route path='/update-package' element={<UpdatePackage />} />
                        <Route path='/service_list' element={<ServiceList />} />
                        <Route path='/add_services' element={<AddServices />} />
                        <Route path='/booked_services' element={<BookedServices />} />
                       

                    </Routes>
                </div>
            </div>
        </>
    )
}

export default AppRoutes