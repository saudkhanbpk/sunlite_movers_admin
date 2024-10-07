import React, { useState } from 'react'
import { BsUpload } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

const AddNewAgents = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        city: '',
        country: '',
        portfolio: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formDataToSend = new FormData();
        // formDataToSend.append('title', formData.title);
        // formDataToSend.append('destination', formData.destination);
        // formDataToSend.append('locationId', formData.locationId);
        // formDataToSend.append('date', formData.date);
        // formDataToSend.append('duration', formData.duration);
        // formDataToSend.append('price', formData.price);
        // formDataToSend.append('description', formData.description);
        // if (selectedFile) {
        //     formDataToSend.append('image', selectedFile);
        // }
        // setLoading(true);

        // try {
        //     const response = await axios.post(`${BaseUrl}/api/addpackage`, formDataToSend, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     toast.success('Package created successfully!');
        //     setTimeout(() => {
        //         navigate('/packages');
        //     }, 3000);
        //     console.log('Package created:', response.data);
        // } catch (error) {
        //     console.error('Error creating package:', error);
        //     toast.error('Error creating package. Please try again.');
        // } finally {
        //     setLoading(false);
        // }
    };
    return (
        <div className='flex items-center'>
            <div className="max-w-md p-6 md:ml-10 bg-[#E8F5FE] rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Agents</h2>
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder='Contact Number'
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="Portfolio"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

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
            <ToastContainer />
        </div>
    )
}

export default AddNewAgents