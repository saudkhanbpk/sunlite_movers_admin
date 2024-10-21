import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Home, Plane, MapPin } from 'lucide-react';

const ServiceList = () => {
  const serviceTypes = [
    { id: 'transport', name: 'Transport Service', icon: <Truck size={24} />, description: 'We provide reliable transport services to various destinations.' },
    { id: 'accommodation', name: 'Accommodation Service', icon: <Home size={24} />, description: 'Find the best accommodation options tailored to your needs.' },
    { id: 'flight', name: 'Flight Service', icon: <Plane size={24} />, description: 'Book your flights easily with competitive rates.' },
    { id: 'guide_tours', name: 'Guide Tours', icon: <MapPin size={24} />, description: 'Explore the city with our experienced guides.' },
  ];

  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Service List</h2>

      {/* Add Service Button */}
      <div className="flex justify-end mb-6">
        <Link
          to="/add_services"
          className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold"
        >
          Add Service
        </Link>
      </div>

      {/* Display the service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {serviceTypes.map((service) => (
          <div
            key={service.id}
            className="cursor-pointer p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-gray-100 text-gray-800 shadow"
            onClick={() => handleCardClick(service)}
          >
            <div className="flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <p className="text-center font-semibold">{service.name}</p>
          </div>
        ))}
      </div>

      {/* Display selected service data */}
      {selectedService && (
        <div className="mt-8 p-4 bg-gray-50 border rounded-md">
          <h3 className="text-xl font-bold">{selectedService.name}</h3>
          <p>{selectedService.description}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
