import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaClock, FaUserCheck } from 'react-icons/fa';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl';
import { toast } from 'react-toastify';

const Guides = () => {
    const navigate = useNavigate();
    const [guidesData, setGuidesData] = useState([]);
    console.log('agent', guidesData);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [updateData, setUpdateData] = useState({});
    // Fetch data from API
    useEffect(() => {
        fetch(`${BaseUrl}/api/getguides`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); // Log fetched data to inspect
                setGuidesData(data.guide); // Make sure 'data.employee' exists
            })
            .catch(error => console.error('Error fetching agents data:', error));
    }, []);


    const handleRowClick = (agent) => {
        setSelectedGuide(agent);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleUpdateClick = () => {
        setIsUpdateFormOpen(true); // Open the update form
        setUpdateData(selectedGuide); // Pre-fill form with selected agent's data
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNavigate = () => {
        navigate('/add_guides');
    };

    const handleDeleteGuide = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/deleteaguides/${selectedGuide._id}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                // Remove the deleted agent from the state
                setGuidesData((prevData) => prevData.filter(guide => guide._id !== selectedGuide._id));
                closeModal();
                toast.success('Guide deleted successfully'); // Show success toast
            } else {
                toast.error('Failed to delete agent'); // Show error toast if the deletion failed
            }
        } catch (error) {
            console.error('Error deleting agent:', error);
            toast.error('An error occurred while deleting the agent'); // Show error toast on failure
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${BaseUrl}/api/updateguides/${selectedGuide._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.status === 200) {
                const updatedAgent = await response.json();
                setGuidesData((prevData) =>
                    prevData.map((agent) =>
                        agent._id === selectedGuide._id ? updatedAgent.guide : agent
                    )
                );
                toast.success(updatedAgent.msg);
                setIsUpdateFormOpen(false);
                closeModal();
            } else {
                toast.error('Failed to update agent');
            }
        } catch (error) {
            console.error('Error updating agent:', error);
        }
    };

    return (
        <div className="container p-4 sm:p-6 md:p-8">
            <Header />
            <div className="flex justify-end">
                <button onClick={handleNavigate} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                    + Add Guide
                </button>
            </div>

            {/* Full-width Agents Table */}
            <div className="w-full pt-5">
                <div className="bg-white border border-black rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-[#E8F5FE]">
                            <tr>
                                <th className="px-4 py-2 text-left text-[17px]">Name</th>
                                <th className="px-4 py-2 text-left text-[17px]">City</th>
                                <th className="px-4 py-2 text-left text-[17px]">Country</th>

                            </tr>
                        </thead>
                        <tbody>
                            {guidesData?.map((guides) => (
                                <tr key={guides._id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(guides)}>
                                    <td className="px-4 py-2 flex items-center">
                                        <img src={guides.image} alt={guides.name} className="w-8 h-8 rounded-full mr-2 text[17px] bg-cover" />
                                        {guides.name}
                                    </td>
                                    <td className="px-4 py-2 text[17px]">{guides.city}</td>
                                    <td className="px-4 py-2 text[17px]">{guides.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for showing guides details */}
            {isModalOpen && selectedGuide && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg border border-black shadow p-6 w-full max-w-sm">
                        <div className="mt-4 flex gap-2 items-center">
                            <button onClick={() => handleDeleteGuide(selectedGuide._id)} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">
                                Delete Guide
                            </button>
                            <button onClick={handleUpdateClick} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                                Update Guide
                            </button>
                        </div>
                        <div className="flex justify-end mb-4">
                            <button onClick={closeModal} className="text-gray-500 text-3xl hover:text-black">&times;</button>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <img src={selectedGuide.image} alt={selectedGuide.name} className="w-32 h-32 rounded-full mb-2 bg-contain" />
                            <h2 className="text-[17px] font-semibold">{selectedGuide.name}</h2>
                            <p className="text-gray-500 text-[17px]">{selectedGuide.city}</p>
                            <p className="text-gray-500 text-[17px]">{selectedGuide.email}</p>

                            <div className="flex mt-2">
                                <button className="mr-2 p-2 bg-blue-100 rounded-full">
                                    <a href='mailto:${selectedGuide.email}'>    <FaEnvelope size={20} className="text-blue-500" /></a>
                                </button>
                                <button className="p-2 bg-blue-100 rounded-full">
                                    <FaPhone size={20} className="text-blue-500" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 bg-[#E8F5FE] p-4">
                            <div className="flex items-center">
                                <FaClock size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Experience</p>
                                    <p className="text-[12px]">{selectedGuide.experience} years</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaBriefcase size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Location</p>

                                    <p className="text-[12px]" >{selectedGuide.location}</p>

                                </div>
                            </div>



                            <div className="flex items-center">
                                <FaUserCheck size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Active Status</p>
                                    <p className="text-[12px]">{selectedGuide.status ? 'Active' : 'Inactive'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Portfolio</h3>
                            <ul className="list-disc pl-5">

                                <li className="text-[13px]" >{selectedGuide.portfolio}</li>

                            </ul>
                        </div>
                        <div className='mt-2'>
                            <h3 className="font-semibold mb-2">Skills</h3>
                            <ul className="list-disc pl-5">

                                <li className="text-[13px]" >{selectedGuide.skills}</li>

                            </ul>
                        </div>
                    </div>
                </div>
            )}


            {isUpdateFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg border border-black shadow p-6 w-full max-w-lg">
                        <h2 className="text-lg font-bold mb-4">Update Guide</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={updateData.name || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={updateData.location || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updateData.email || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Experience (years):</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={updateData.experience || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Portfolio:</label>
                                <input
                                    type="text"
                                    name="portfolio"
                                    value={updateData.portfolio || ''}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Guides;
