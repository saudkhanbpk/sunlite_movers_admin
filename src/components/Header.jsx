import React, { useState } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const getTitle = () => {
    const titles = {
      "/": "DASHBOARD",
      "/packages": "PACKAGES",
      "/booking": "BOOKINGS",
      "/calendar": "CALENDAR",
      "/agents": "AGENTS",
      "/guides": "GUIDES",
      "/drivers": "DRIVERS",
      "/booked_services": "BOOKED SERVICES",
      "/influencers": "INFLUENCERS",
      "/location": "LOCATIONS",
      "/service_list": "SERVICE LIST",
    };

    return titles[location.pathname] || "DASHBOARD";
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">{getTitle()}</h1>

      <div className="flex items-center w-full md:w-auto">
        <div className="relative flex-grow md:flex-grow-0 mr-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
          />
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <button className="p-2 rounded-full bg-gray-200 mr-4">
          <FiBell size={20} />
        </button>

        <div className="bg-[#E8F5FE] px-5 py-2 rounded-full shadow-lg flex items-center justify-center">
          <button onClick={handleLogout} className="text-black font-bold">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
