import React from 'react';

const BookedServices = () => {
  // Static booked services data
  const bookedServices = [
    {
      id: 1,
      serviceName: 'Luxury Sedan',
      serviceType: 'Transport',
      bookingDate: '2024-10-15',
      departDate: '2024-07-12',
      returnDate: '2024-08-19',
      customerName: 'John Doe',
      price: '$100',
    },
    {
      id: 2,
      serviceName: 'Emirates Flight EK007',
      serviceType: 'Flight',
      bookingDate: '2024-10-16',
      departDate: '2024-07-12',
      returnDate: '2024-08-19',
      customerName: 'Alice Johnson',
      price: '$1200',
    },
    {
      id: 3,
      serviceName: 'Marina Bay Hotel',
      serviceType: 'Accommodation',
      bookingDate: '2024-10-14',
      departDate: '2024-07-12',
      returnDate: '2024-08-19',
      customerName: 'James Smith',
      price: '$300',
    },
    {
      id: 4,
      serviceName: 'Dubai City Tour',
      serviceType: 'Tours',
      bookingDate: '2024-10-17',
      departDate: '2024-07-12',
      returnDate: '2024-08-19',
      customerName: 'Emily Davis',
      price: '$150',
    },
  ];

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Booked Services</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left border-b">Service Name</th>
              <th className="py-2 px-4 text-left border-b">Service Type</th>
              <th className="py-2 px-4 text-left border-b">Booking Date</th>
              <th className="py-2 px-4 text-left border-b">Depart Date</th>
              <th className="py-2 px-4 text-left border-b">Return Date</th>
              <th className="py-2 px-4 text-left border-b">Customer Name</th>
              <th className="py-2 px-4 text-left border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookedServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{service.serviceName}</td>
                <td className="py-2 px-4 border-b">{service.serviceType}</td>
                <td className="py-2 px-4 border-b">{service.bookingDate}</td>
                <td className="py-2 px-4 border-b">{service.departDate}</td>
                <td className="py-2 px-4 border-b">{service.returnDate}</td>
                <td className="py-2 px-4 border-b">{service.customerName}</td>
                <td className="py-2 px-4 border-b">{service.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedServices;
