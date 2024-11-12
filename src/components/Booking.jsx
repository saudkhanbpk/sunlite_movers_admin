import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
const Booking = () => {
    const [bookingData, setBookingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingBooking, setLoadingBooking] = useState(null);
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/bookings`);
                setBookingData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, []);

    const updateBookingStatus = async (bookingCode, newStatus) => {
        setLoadingBooking(bookingCode);
        try {
            await axios.put(`${BaseUrl}/api/updatebooking/${bookingCode}`, { status: newStatus.toLowerCase() });
            console.log(`Status updated for booking ${bookingCode} to ${newStatus}`);
            toast.success('Booking Status Updated')
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setLoadingBooking(null);
        }
    };

    const handleStatusChange = (bookingCode, newStatus) => {
        setBookingData((prevData) =>
            prevData.map((booking) =>
                booking.bookingCode === bookingCode ? { ...booking, status: newStatus } : booking
            )
        );

        updateBookingStatus(bookingCode, newStatus);
    };


    const filteredBookings = bookingData.filter((booking) =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.duration.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <Header onSearch={setSearchTerm} searchTerm={searchTerm} />
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto text-[15px]">
                    <thead className="bg-[#E8F5FE]">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Booking Code</th>
                            <th className="px-4 py-2 text-left">Package</th>
                            <th className="px-4 py-2 text-left">Days</th>
                            <th className="px-4 py-2 text-left">Nights</th>
                            <th className="px-4 py-2 text-left">Hours</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => {
                                const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                });

                                return (
                                    <tr key={booking._id} className="border-b">
                                        <td className="px-4 py-2">{booking.name}</td>
                                        <td className="px-4 py-2">{booking.bookingCode}</td>
                                        <td className="px-4 py-2">{booking.title}</td>
                                        <td className="px-4 py-2">{booking.days}</td>
                                        <td className="px-4 py-2">{booking.nights}</td>
                                        <td className="px-4 py-2">{booking.hours}</td>
                                        <td className="px-4 py-2">{formattedDate}</td>
                                        <td className="px-4 py-2">{booking.price}</td>
                                        <td className="px-4 py-2">
                                            {loadingBooking === booking.bookingCode ? (
                                                <div className="text-blue-500">
                                                    <FaSpinner className="animate-spin mr-2" />
                                                </div>
                                            ) : (
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => handleStatusChange(booking.bookingCode, e.target.value)}
                                                    className="border rounded px-2 py-1"
                                                    disabled={loadingBooking !== null}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            )}
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
        </div>
    );
};

export default Booking;
