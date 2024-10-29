import React, { useState } from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import user from '../assets/img/sam.jpg'
const Header = ({ onSearch }) => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const getTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'DASHBOARD';
            case '/packages':
                return 'PACKAGES';
            case '/booking':
                return 'BOOKINGS';
            case '/calendar':
                return 'CALENDER';
            case '/agents':
                return 'AGENTS';
            case '/guides':
                return 'GUIDES';
            case '/drivers':
                return 'DRIVERS';
            case '/calender':
                return 'Calender';
            case '/booked_services':
                return 'Booked Services';
            case '/influencers':
                return 'Influencers';
            default:
                return 'Dashboard';
        }

    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Pass the search term to the parent component
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">{getTitle()}</h1>
            <div className="flex items-center w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0 mr-4">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm} // Bind the local search term state
                        onChange={handleSearchChange} // Handle search input changes
                        className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button className="p-2 rounded-full bg-gray-200 mr-4">
                    <FiBell size={20} />
                </button>
                <div className="w-10 h-10 bg-gray-300 rounded-full">
                    <img className='w-10 h-10 rounded-full' src={user} />
                </div>
            </div>
        </div>
    );
};

export default Header;
