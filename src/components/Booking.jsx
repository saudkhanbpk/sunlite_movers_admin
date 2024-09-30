import React from 'react';
import Header from './Header';
const bookingsData = [
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Pending' },
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Pending' },
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
    { name: 'Comela Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
];

const Booking = () => {
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
                        {bookingsData.map((booking, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{booking.name}</td>
                                <td className="px-4 py-2">{booking.bookingCode}</td>
                                <td className="px-4 py-2">{booking.package}</td>
                                <td className="px-4 py-2">{booking.duration}</td>
                                <td className="px-4 py-2">{booking.date}</td>
                                <td className="px-4 py-2">{booking.price}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Confirmed' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-800'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Booking;