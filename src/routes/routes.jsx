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
import Packages from "../components/Packages";
import AddPackage from "../components/AddPackage";
import AddLocation from "../components/AddLocation";
import Calendar from "../components/Calendar";
import AddNewAgents from "../components/AddNewAgents";
import AddNewGuides from "../components/AddNewGuides";
import AddNewDrivers from "../components/AddNewDrivers";
import PackagesDetails from "../components/PackagesDetails";
import UpdatePackage from "../components/UpdatePackage";
import BookedServices from "../components/BookedServices";
import ServiceList from "../components/ServiceList";
import AddServices from "../components/AddServices";
import Influencers from "../components/Influencers";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";

const AppRoutes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const hideSidebar = location.pathname === "/login" || location.pathname === "/forgot-password";

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
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agents"
              element={
                <ProtectedRoute>
                  <Agents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guides"
              element={
                <ProtectedRoute>
                  <Guides />
                </ProtectedRoute>
              }
            />
            <Route
              path="/drivers"
              element={
                <ProtectedRoute>
                  <Drivers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add_package"
              element={
                <ProtectedRoute>
                  <AddPackage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/location"
              element={
                <ProtectedRoute>
                  <AddLocation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add_agent"
              element={
                <ProtectedRoute>
                  <AddNewAgents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add_guides"
              element={
                <ProtectedRoute>
                  <AddNewGuides />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add_drivers"
              element={
                <ProtectedRoute>
                  <AddNewDrivers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/packages"
              element={
                <ProtectedRoute>
                  <Packages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/package-details"
              element={
                <ProtectedRoute>
                  <PackagesDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-package"
              element={
                <ProtectedRoute>
                  <UpdatePackage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service_list"
              element={
                <ProtectedRoute>
                  <ServiceList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add_services"
              element={
                <ProtectedRoute>
                  <AddServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booked_services"
              element={
                <ProtectedRoute>
                  <BookedServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/influencers"
              element={
                <ProtectedRoute>
                  <Influencers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
