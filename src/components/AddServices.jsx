import React, { useState } from 'react';
import { Truck, Home, Plane, Users, MapPin } from 'lucide-react';

const AddServices = ({ addService }) => {
    const [selectedService, setSelectedService] = useState('transport');
    const [formData, setFormData] = useState({ type: selectedService });

    const serviceTypes = [
        { id: 'transport', name: 'Transport Service', icon: <Truck size={24} /> },
        { id: 'accommodation', name: 'Accommodation Service', icon: <Home size={24} /> },
        { id: 'flight', name: 'Flight Service', icon: <Plane size={24} /> },
        { id: 'guide_tours', name: 'Guide Tours', icon: <MapPin size={24} /> },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleServiceSelect = (e) => {
        setSelectedService(e.target.value);
        setFormData({ type: e.target.value }); // Reset formData to include the selected type
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addService(formData); // Add new service
        setFormData({ type: selectedService }); // Reset the form data
    };

    return (
        <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Add New Service</h2>
            <form onSubmit={handleSubmit}> {/* Add the opening form tag */}
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="w-full p-2 mb-4 border rounded"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="propertyType"
                    placeholder="Enter Descriptions..."
                    className="w-full p-2 mb-4 border rounded"
                    onChange={handleInputChange}
                />
                <div className="flex flex-col mb-4">
                    <label htmlFor="passengers" className="mb-2 font-semibold">Service Types</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            id="passengers"
                            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            <option value="1">Flight Book</option>
                            <option value="2">Accommdotion</option>
                            <option value="3">Transport</option>
                            <option value="4">Guide Tour</option>
                        </select>
                    </div>
                </div>


                <button
                    type="submit"
                    className="bg-green-600  text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out font-semibold"
                >
                    Submit
                </button>
            </form> {/* Add the closing form tag */}
        </div>
    );
};

export default AddServices;
