import React, { useState, useEffect } from 'react';
import { Truck, Home, Plane } from 'lucide-react';
import { BsUpload } from 'react-icons/bs';

const AddServices = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [addedServices, setAddedServices] = useState([]);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  const serviceTypes = [
    { id: 'transport', name: 'Transport Service', icon: <Truck size={24} /> },
    { id: 'accommodation', name: 'Accommodation Service', icon: <Home size={24} /> },
    { id: 'flight', name: 'Flight Service', icon: <Plane size={24} /> },
  ];

  // Sample suggestion data (in a real app, this might come from an API)
  const sampleSuggestions = {
    vehicleType: ['Sedan', 'SUV', 'Van', 'Luxury Car', 'Bus'],
    airline: ['Emirates', 'Etihad Airways', 'flydubai', 'Air Arabia'],
    propertyType: ['Hotel', 'Apartment', 'Villa', 'Resort'],
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setFormData({});
    setSuggestions({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Generate suggestions based on input
    if (sampleSuggestions[name]) {
      const filtered = sampleSuggestions[name].filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions((prev) => ({ ...prev, [name]: filtered }));
    }
  };

  const handleSuggestionClick = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuggestions((prev) => ({ ...prev, [name]: [] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      type: selectedService,
      ...formData,
    };
    setAddedServices((prev) => [...prev, serviceData]);
    setSelectedService(null);
    setFormData({});
    setSuggestions({});
  };

  const handleDeleteService = (index) => {
    const updatedServices = addedServices.filter((_, i) => i !== index);
    setAddedServices(updatedServices);
  };

  const renderSuggestions = (name) => {
    return suggestions[name] && suggestions[name].length > 0 ? (
      <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
        {suggestions[name].map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSuggestionClick(name, item)}
          >
            {item}
          </li>
        ))}
      </ul>
    ) : null;
  };

  const renderForm = () => {
    switch (selectedService) {
      case 'transport':
        return (
          <>
            <div className="relative">
              <input
                type="text"
                name="vehicleType"
                placeholder="Enter vehicle type"
                value={formData.vehicleType || ''}
                className="w-full p-2 mb-1 border rounded"
                onChange={handleInputChange}
              />
              {renderSuggestions('vehicleType')}
            </div>
            <input
              type="number"
              name="capacity"
              placeholder="Passenger capacity"
              className="w-full p-2 mb-4 border rounded"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="pricePerKm"
              placeholder="Price per km (e.g., 2.50)"
              className="w-full p-2 mb-4 border rounded"
              onChange={handleInputChange}
            />
          </>
        );
      case 'accommodation':
        return (
          <>
            <input
              type="text"
              name="propertyName"
              placeholder="Enter property name"
              className="w-full p-2 mb-4 border rounded"
              onChange={handleInputChange}
            />
            <div className="relative">
              <input
                type="text"
                name="propertyType"
                placeholder="Enter property type"
                value={formData.propertyType || ''}
                className="w-full p-2 mb-1 border rounded"
                onChange={handleInputChange}
              />
              {renderSuggestions('propertyType')}
            </div>
            <input
              type="number"
              name="pricePerNight"
              placeholder="Price per night"
              className="w-full p-2 mb-4 border rounded"
              onChange={handleInputChange}
            />
          </>
        );
      case 'flight':
        return (
          <>
            <div className="relative">
              <div className="flex justify-center items-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative">
                <div className="text-center">
                  <BsUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Upload picture</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 mb-4 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {fileName && (
                <p className="text-sm text-gray-600 mt-2">Selected file: {fileName}</p>
              )}
              <div className='pt-5'>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.airline || ''}
                  className="w-full p-2 mb-4 border rounded"
                  onChange={handleInputChange}
                />
                {renderSuggestions('airline')}
              </div>
              <input
                type="text"
                name="description"
                placeholder="Enter Description"
                className="w-full p-2 mb-4 border rounded"
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold  mb-8 text-gray-800">Add New Service</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {serviceTypes.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={`cursor-pointer p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${selectedService === service.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-800 shadow'
              }`}
          >
            <div className="flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <p className="text-center font-semibold">{service.name}</p>
          </div>
        ))}
      </div>

      {selectedService && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}
          <button
            type="submit"
            className="w-fit bg-green-600 text-white py-3 px-3 rounded-md hover:bg-green-700 transition duration-300 ease-in-out font-semibold"
          >
            Add Service
          </button>
        </form>
      )}

      {/* Display added services */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Added Services</h3>
        {addedServices.length > 0 ? (
          <ul className="space-y-4">
            {addedServices.map((service, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between">
                <div>
                  <p className="font-bold capitalize">{service.type.replace('_', ' ')}</p>
                  {Object.entries(service).map(([key, value]) => (
                    key !== 'type' && <p key={key}><strong>{key}:</strong> {value}</p>
                  ))}
                </div>
                <button
                  onClick={() => handleDeleteService(index)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No services added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddServices;
