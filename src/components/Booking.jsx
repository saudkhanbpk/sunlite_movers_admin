import React from 'react';

const bookingsData = [
  { id: 1, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
  { id: 2, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Pending' },
  { id: 3, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
  { id: 4, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
  { id: 5, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Pending' },
  { id: 6, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
  { id: 7, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
  { id: 8, name: 'Cornelia Swan', bookingCode: '592303', package: 'Desert Safari', duration: '7 Days', date: '02/11/2023', price: '$120', status: 'Confirmed' },
];

const TableHeader = () => (
  <thead className="bg-[#E8F5FE]">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Code</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
    </tr>
  </thead>
);

const TableRow = ({ booking }) => (
  <tr className="bg-white">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.bookingCode}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.package}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.duration}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.price}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        booking.status === 'Confirmed' ? 'bg-[#3C60FF] text-white' : 'bg-[#6AD2FF] text-white'
      }`}>
        {booking.status}
      </span>
    </td>
  </tr>
);

const BookingsTable = () => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader />
              <tbody className="bg-white divide-y divide-gray-200">
                {bookingsData.map((booking) => (
                  <TableRow key={booking.id} booking={booking} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">BOOKING</h2>
                <div className="flex items-center">
                    <input type="text" placeholder="Search" className="p-2 rounded mr-4 bg-gray-100" />
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
            </header>
      <BookingsTable />
    </div>
  );
};

export default Booking;