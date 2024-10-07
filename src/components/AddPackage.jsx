import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsUpload } from 'react-icons/bs';
import { BaseUrl } from '../BaseUrl';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPackage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        destination: '',
        locationId: '',
        date: '',
        duration: '',
        price: '',
        description: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/getAllLocations`);
                setLocations(response.data.locations);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({...prevState,[name]: value}));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formdata", FormData)
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('destination', formData.destination);
        formDataToSend.append('locationId', formData.locationId);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('duration', formData.duration);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('description', formData.description);
        if (selectedFile) {
            formDataToSend.append('image', selectedFile);
        }
        setLoading(true);

        try {
            const response = await axios.post(`${BaseUrl}/api/addpackage`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Package created successfully!');
            setTimeout(() => {
                navigate('/packages');
            }, 3000);
            console.log('Package created:', response.data);
        } catch (error) {
            console.error('Error creating package:', error);
            toast.error('Error creating package. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center'>
            <div className="max-w-md p-6 md:ml-10 bg-[#E8F5FE] rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Package</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center items-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative">
                        <div className="text-center">
                            <BsUpload className="mx-auto h-12 w-12 text-gray-400" />
                            <span className="mt-2 block text-sm font-medium text-gray-900">Upload picture</span>
                        </div>
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleFileChange} // Handle file selection
                        />
                    </div>
                    {fileName && (
                        <p className="text-sm text-gray-600 mt-2">Selected file: {fileName}</p>
                    )}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Tour name"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="locationId"
                        value={formData.locationId}
                        onChange={handleChange}
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Location</option>
                        {locations.map(location => (
                            <option key={location._id} value={location._id}>
                                {location.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="destination"
                        value={formData.tourDestination}
                        onChange={handleChange}
                        placeholder="Tour destination"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Tour duration"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price per person"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    ></textarea>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <FaSpinner className="animate-spin mr-2" /> {/* Spinner icon */}
                                Processing...
                            </div>
                        ) : (
                            'Create now'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;