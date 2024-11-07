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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/api/service-booking/${id}`)
      setBookedServices(bookedServices.filter((service) => service._id !== id))
    } catch (error) {
      console.log("Error deleteing booking", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <th className="py-2 px-4 text-left border-b">Phone Number</th>
              <th className="py-2 px-4 text-left border-b">Action</th>

              {/* <th className="py-2 px-4 text-left border-b">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {bookedServices.length > 0 ? (
              bookedServices.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{service.title}</td>
                  <td className="py-2 px-4 border-b">{service.name}</td>
                  <td className="py-2 px-4 border-b">{service.adults}</td>
                  <td className="py-2 px-4 border-b">{service.children}</td>
                  <td className="py-2 px-4 border-b">{service.number}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>


                  {/* <td className="py-2 px-4 border-b">
                    <select
                     
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td> */}
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
