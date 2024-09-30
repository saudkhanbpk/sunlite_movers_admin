import React from 'react'
import { Home, Package, BookOpen, Calendar, Users, MapPin, Truck } from 'lucide-react';
const Sidebar = () => {
    return (
        <div>
            <div className="w-52 bg-[#E8F5FE] h-screen">
                <div className="p-4 pt-10">
                    <h1 className="text-2xl font-bold">KKRA</h1>
                </div>
                <nav className="mt-6">
                    <a href="#" className="flex items-center px-4 py-2 text-purple-600 ">
                        <Home className="mr-3" size={20} />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700">
                        <Package className="mr-3" size={20} />
                        Packages
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700">
                        <BookOpen className="mr-3" size={20} />
                        Bookings
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700">
                        <Calendar className="mr-3" size={20} />
                        Calendar
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700">
                        <Users className="mr-3" size={20} />
                        Agents
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700">
                        <MapPin className="mr-3" size={20} />
                        Guides
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-gray-700">
                        <Truck className="mr-3" size={20} />
                        Drivers
                    </a>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar