import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Booking from "../components/Booking";
import Agents from "../components/Agents";
import Guides from "../components/Guides";
import Drivers from "../components/Drivers";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";

const AppRoutes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/forgot-password";

  return (
    <>
      {!hideSidebar && (
        <div className="block md:hidden p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#000000]">
            {isOpen ? <IoMdCloseCircle size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      )}
      <div className="flex overflow-y-hidden h-screen">
        {!hideSidebar && <Sidebar isOpen={isOpen} />}
        <div
          className={`flex-1 h-screen overflow-y-scroll ${
            hideSidebar ? "" : ""
          }`}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/drivers" element={<Drivers />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
