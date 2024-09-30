import React from 'react';
import { FaHome, FaBox, FaBookOpen, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaTruck } from 'react-icons/fa'; // Importing react-icons
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <div className="w-52 bg-[#E8F5FE] h-screen">
                <div className="p-4 pt-10">
                    <h1 className="text-2xl font-bold">KKRA</h1>
                </div>
                <nav className="mt-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `flex items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaHome className="mr-3" size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/packages"
                        className={({ isActive }) => `flex pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaBox className="mr-3" size={20} />
                        Packages
                    </NavLink>
                    <NavLink
                        to="/bookings"
                        className={({ isActive }) => `flex pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaBookOpen className="mr-3" size={20} />
                        Bookings
                    </NavLink>
                    <NavLink
                        to="/calendar"
                        className={({ isActive }) => `flex pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaCalendarAlt className="mr-3" size={20} />
                        Calendar
                    </NavLink>
                    <NavLink
                        to="/agents"
                        className={({ isActive }) => `flex pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaUsers className="mr-3" size={20} />
                        Agents
                    </NavLink>
                    <NavLink
                        to="/guides"
                        className={({ isActive }) => `flex pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaMapMarkerAlt className="mr-3" size={20} />
                        Guides
                    </NavLink>
                    <NavLink
                        to="/drivers"
                        className={({ isActive }) => `flex pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaTruck className="mr-3" size={20} />
                        Drivers
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
