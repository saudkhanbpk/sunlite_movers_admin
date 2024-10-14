import React from 'react';
import { FaHome, FaBox, FaBookOpen, FaServicestack, FaLocationArrow, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaTruck, FaBars } from 'react-icons/fa'; // Importing react-icons
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/kkra_logo.png'
const Sidebar = ({ isOpen }) => {
    return (
        <div className="relative z-10 overflow-y-scroll">
            <div className={`w-52 bg-[#E8F5FE] h-auto absolute md:relative ${isOpen ? 'block' : 'hidden md:block'}`}>
                <div className="p-4 pt-7">
                    <img src={logo} className='w-[150px] h-[150px' />
                </div>
                <nav className="mt-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `flex text-[20px] items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaHome className="mr-3" size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/packages"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaBox className="mr-3" size={20} />
                        Packages
                    </NavLink>
                    <NavLink
                        to="/location"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaLocationArrow className="mr-3" size={20} />
                        Add Location
                    </NavLink>
                    <NavLink
                        to="/add_services"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaServicestack className="mr-3" size={20} />
                        Add Services
                    </NavLink>
                    <NavLink
                        to="/booking"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaBookOpen className="mr-3" size={20} />
                        Bookings
                    </NavLink>
                    <NavLink
                        to="/calendar"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaCalendarAlt className="mr-3" size={20} />
                        Calendar
                    </NavLink>
                    <NavLink
                        to="/agents"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaUsers className="mr-3" size={20} />
                        Agents
                    </NavLink>
                    <NavLink
                        to="/guides"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
                    >
                        <FaMapMarkerAlt className="mr-3" size={20} />
                        Guides
                    </NavLink>
                    <NavLink
                        to="/drivers"
                        className={({ isActive }) => `flex text-[20px] pt-6 items-center px-4 py-2 ${isActive ? 'text-[#4318FF]' : 'text-[#000000]'}`}
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
