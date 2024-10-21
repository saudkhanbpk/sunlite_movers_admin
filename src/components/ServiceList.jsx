import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Home, Plane, MapPin } from 'lucide-react';
import { BaseUrl } from '../BaseUrl';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);  // State to hold service being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState('');     // State for search input

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await fetch(`${BaseUrl}/api/services`);
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      setServices(data);
      console.log('Fetched Services:', data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle service deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/api/services/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      const result = await response.json();
      console.log(result.msg);
      toast.success(result.msg);

      setServices((prevServices) => prevServices.filter((service) => service._id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Handle opening the edit modal
  const handleEdit = (service) => {
    setEditService(service);
    setIsModalOpen(true); // Open the modal
  };

  // Handle updating the service
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', editService.name);
    formData.append('description', editService.description);
    formData.append('selectedType', editService.selectedType);

    // If there's a new image file selected
    if (e.target.image.files[0]) {
      formData.append('image', e.target.image.files[0]);
    }

    try {
      const response = await fetch(`${BaseUrl}/api/services/${editService._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      const result = await response.json();
      toast.success(result.msg);

      // Close modal and refresh service list
      setIsModalOpen(false);
      fetchServices(); // Refresh service list after update

    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const getServiceIcon = (type) => {
    switch (type.trim().toLowerCase()) {
      case 'transport':
        return <Truck size={24} />;
      case 'accommodation':
        return <Home size={24} />;
      case 'flight':
        return <Plane size={24} />;
      case 'guide tour':
        return <MapPin size={24} />;
      default:
        return null;
    }
  };

  // Filter services based on the search query
 // Filter services based on the search query
const filteredServices = services.filter(service => {
  const serviceName = service.name ? service.name.toLowerCase().trim() : ''; // Fallback if null
  const serviceType = service.selectedType ? service.selectedType.toLowerCase().trim() : ''; // Fallback if null
  const searchLower = searchQuery.toLowerCase().trim();

  // Filter by name or type
  return serviceName.includes(searchLower) || serviceType.includes(searchLower);
});


  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Service List</h2>
      
      {/* Search input */}
      <div className="relative flex-grow md:flex-grow-0 mb-6">
        <input
          type="text"
          placeholder="Search by name or type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
          className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="flex justify-end mb-6">
        <Link
          to="/add_services"
          className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold"
        >
          Add Service
        </Link>
      </div>

      <div className="flex w-full gap-6 mb-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service._id}
              className="cursor-pointer md:w-[400px] w-full p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-gray-100 text-gray-800 shadow"
            >
              <div className='flex items-center justify-between'>
                <div className="">
                  {getServiceIcon(service.selectedType)}
                </div>
                <div className='flex items-center gap-2 text-[20px]'>
                  {/* Edit Button */}
                  <div
                    className='text-yellow-300 cursor-pointer'
                    onClick={() => handleEdit(service)}  // Open edit modal when clicked
                  >
                    <FaRegEdit />
                  </div>

                  {/* Delete Button */}
                  <div
                    className='text-red-500 cursor-pointer'
                    onClick={() => handleDelete(service._id)}
                  >
                    <MdOutlineDeleteOutline />
                  </div>
                </div>
              </div>

              <div className='pt-4'>
                <p className="font-bold">Service Name : {service.name}</p>
                <p className="pt-2">Service Type : {service.selectedType}</p>
                <p className="pt-3">Service Description : {service.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No services found matching your search.</p>
        )}
      </div>

      {/* Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Edit Service</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700">Service Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editService?.name || ''}
                  onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editService?.description || ''}
                  onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Type:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editService?.selectedType || ''}
                  onChange={(e) => setEditService({ ...editService, selectedType: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Upload Image:</label>
                <input type="file" name="image" />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList