import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';

const Booking = () => {
    const [bookingData, setBookingData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bookings');
                setBookingData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <Header />
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-[#E8F5FE]">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Booking Code</th>
                            <th className="px-4 py-2 text-left">Package</th>
                            <th className="px-4 py-2 text-left">Duration</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingData.length > 0 ? (
                            bookingData.map((booking, index) => {
                                const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                });

                                return (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{booking.name}</td>
                                        <td className="px-4 py-2">{booking.bookingCode}</td>
                                        <td className="px-4 py-2">{booking.title}</td>
                                        <td className="px-4 py-2">{booking.duration}</td>
                                        <td className="px-4 py-2">{formattedDate}</td>
                                        <td className="px-4 py-2">{booking.price}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-800'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-2 text-center">
                                    No bookings available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Booking;
