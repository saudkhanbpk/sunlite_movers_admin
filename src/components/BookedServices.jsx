import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import Header from './Header';

const BookedServices = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('bookedServices', bookedServices);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/service-booking`);
        setBookedServices(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <Header />
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left border-b">Service Name</th>
              <th className="py-2 px-4 text-left border-b">Customer Name</th>
              <th className="py-2 px-4 text-left border-b">Adults</th>
              <th className="py-2 px-4 text-left border-b">Children</th>
              <th className="py-2 px-4 text-left border-b">Price</th>
              <th className="py-2 px-4 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookedServices.length > 0 ? (
              bookedServices.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{service.title}</td>
                  <td className="py-2 px-4 border-b">{service.name}</td>
                  {/* <td className="py-2 px-4 border-b">{formatDate(service.BookingDate)}</td>
                  <td className="py-2 px-4 border-b">{formatDate(service.departDate)}</td>
                  <td className="py-2 px-4 border-b">{formatDate(service.returnDate)}</td> */}
                  <td className="py-2 px-4 border-b">{service.adults}</td>
                  <td className="py-2 px-4 border-b">{service.children}</td>
                  <td className="py-2 px-4 border-b">{service.price}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      // value={booking.status}
                      // onChange={(e) => handleStatusChange(booking.bookingCode, e.target.value)}
                      className="border rounded px-2 py-1"
                    // disabled={loadingBooking !== null}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-4 text-center">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedServices;
