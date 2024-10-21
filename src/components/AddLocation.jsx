import React, { useState } from 'react';
import axios from 'axios';
import { BsUpload } from 'react-icons/bs';
import { BaseUrl } from '../BaseUrl';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddLocation = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title } = formData;
        const data = new FormData();
        data.append('name', title);
        data.append('image', selectedFile);
        setLoading(true)
        try {
            const response = await axios.post(`${BaseUrl}/api/locations`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Location added successfully!');

            if (response.status === 201) {
                setSuccessMessage('Location created successfully');
                setErrorMessage('');
                setFormData({ title: '', image: '' });
                setSelectedFile(null);
            } else {
                setErrorMessage('Failed to create location');
            }
        } catch (error) {
            console.error('Error uploading the location:', error);
            toast.error('Error creating package. Please try again.');
            setErrorMessage('An error occurred while uploading');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            <div className="md:w-[50%] p-6 md:ml-10 bg-[#E8F5FE] rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Location</h2>
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
                            onChange={handleFileChange}
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
                        placeholder="Country name"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <FaSpinner className="animate-spin mr-2" />
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

export default AddLocation;
