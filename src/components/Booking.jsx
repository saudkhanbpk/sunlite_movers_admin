import React, { useState, useEffect } from "react";
import Header from "./Header";
import { getRequest } from "../ApiServices/ApiService";
const Booking = () => {
  const [bookingData, setBookingData] = useState([]);
  console.log(bookingData);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getRequest('/get');
        setBookingData(response);
        setFilteredData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = bookingData.filter(
      (booking) =>
        booking.personalInfo.name.toLowerCase().includes(query.toLowerCase()) ||
        booking.bookingCode.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBooking(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header onSearch={handleSearch} />
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto text-[15px]">
          <thead className="bg-[#E8F5FE]">
            <tr>
              <th className="px-4 py-2 text-left">Job Type</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((booking) => {
                return (
                  <tr
                    key={booking._id}
                    className="border-b"
                    onClick={() => handleRowClick(booking)}
                  >
                    <td className="px-4 py-2">{booking.jobType}</td>
                    <td className="px-4 py-2">{booking.personalInfo.name}</td>
                    <td className="px-4 py-2">{booking.personalInfo.email}</td>
                    <td className="px-4 py-2">
                      {booking.personalInfo.phoneNumber}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showPopup && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-96 shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <p>
              <strong>Job Type:</strong> {selectedBooking.jobType}
            </p>
            <p>
              <strong>Name:</strong> {selectedBooking.personalInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedBooking.personalInfo.email}
            </p>
            <p>
              <strong>Phone Number:</strong>{" "}
              {selectedBooking.personalInfo.phoneNumber}
            </p>

            <p>
              <strong>Moving From:</strong>
              <div className="flex items-center">
                <p>Post Code:</p>
                <p> {selectedBooking.movingTo.postCode}</p>
              </div>
              <div className="flex items-center">
                <p>Address:</p>
                <p> {selectedBooking.movingTo.address}</p>,
              </div>
            </p>
            <p>
              <strong>Moving To:</strong>
              <div className="flex items-center">
                <p>Post Code:</p>
                <p> {selectedBooking.movingFrom.postCode}</p>
              </div>
              <div className="flex items-center">
                <p>Address:</p>
                <p> {selectedBooking.movingFrom.address}</p>,
              </div>
            </p>
            <p>
              <strong>Requirments:</strong>
              <div className="flex items-center">
                <p>Moving Date:</p>
                <p> {selectedBooking.requirements.movingDate}</p>
              </div>
              <div className="flex items-center">
                <p>Helpers:</p>
                <p> {selectedBooking.requirements.loadingHelp}</p>
              </div>
              <div className="flex items-center">
                <p>Vehicle Required:</p>
                <p> {selectedBooking.requirements.vehicleRequired}</p>
              </div>
            </p>
            <p>
              <strong>Additional Info:</strong>
              <div className="flex items-center">
                <p>Extra Details:</p>
                <p> {selectedBooking.additionalInfo.extraDetails}</p>
              </div>
              <div className="flex items-center">
                <p>Item List:</p>
                <p> {selectedBooking.additionalInfo.itemList}</p>
              </div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
