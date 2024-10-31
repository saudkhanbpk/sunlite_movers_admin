import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { BsUpload } from 'react-icons/bs';
import { BaseUrl } from '../BaseUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddServices = () => {
  const naviagete = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('Flight Book');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('selectedType', selectedType);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch(`${BaseUrl}/api/services`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg);
        naviagete('/service_list')
        setName('');
        setDescription('');
        setSelectedType('Flight Book');
        setFileName('');
        setSelectedFile(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Error creating service');
      }
    } catch (error) {
      toast.error('An error occurred while creating the service');
      console.error('Error:', error);
    }
  };


  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative">
          <div className="text-center">
            <BsUpload className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">Upload picture</span>
          </div>
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        {fileName && (
          <p className="text-sm text-gray-600 mt-2">Selected file: {fileName}</p>
        )}

        <div className="pt-5">
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Service Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

         
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddServices;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Truck, Home, Plane, MapPin } from 'lucide-react';
// import { BaseUrl } from '../BaseUrl';
// import { MdOutlineDeleteOutline } from 'react-icons/md';
// import { FaRegEdit } from 'react-icons/fa';

// const ServiceList = () => {
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);

//   const fetchServices = async () => {
//     try {
//       const response = await fetch(`${BaseUrl}/api/services`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch services');
//       }
//       const data = await response.json();
//       setServices(data);
//       console.log('Fetched Services:', data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const handleCardClick = (service) => {
//     setSelectedService(service);
//   };

//   const getServiceIcon = (type) => {
//     switch (type.trim().toLowerCase()) {
//       case 'transport':
//         return <Truck size={24} />;
//       case 'accommodation':
//         return <Home size={24} />;
//       case 'flight':
//         return <Plane size={24} />;
//       case 'guide tour':
//         return <MapPin size={24} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
//       <h2 className="text-2xl font-bold mb-8 text-gray-800">Service List</h2>

//       <div className="flex justify-end mb-6">
//         <Link
//           to="/add_services"
//           className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold"
//         >
//           Add Service
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {services.map((service) => (
//           <div
//             key={service._id}
//             className="cursor-pointer p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-gray-100 text-gray-800 shadow"
//             onClick={() => handleCardClick(service)}
//           >
//             <div className="flex items-center justify-center mb-4">
//               {getServiceIcon(service.selectedType)}
//             </div>
//             <p className="text-center font-semibold">{service.name}</p>
//           </div>
//         ))}
//       </div>

//       {selectedService && (
//         <div className="mt-8 p-4 bg-gray-50 border rounded-md">
//           <div className='flex items-center gap-2 justify-between'>
//             <h3 className="text-xl font-bold">{selectedService.name}</h3>
//             <div className='flex text-[20px] items-center gap-2'>
//               <div>
//                 <FaRegEdit className='text-yellow-300' />
//               </div>
//               <div>
//                 <MdOutlineDeleteOutline className='text-red-500' />
//               </div>
//             </div>
//           </div>

//           <p>{selectedService.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServiceList;

