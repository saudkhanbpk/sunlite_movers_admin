import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaClock, FaUserCheck } from 'react-icons/fa';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl';

const Agents = () => {
    const navigate = useNavigate();
    const [agentsData, setAgentsData] = useState([]);
    console.log('agent', agentsData);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch data from API
    useEffect(() => {
        fetch(`${BaseUrl}/api/employee`)
            .then(response => response.json())
            .then(data => {
                setAgentsData(data.employees); // Assuming data is in 'employees' field
            })
            .catch(error => console.error('Error fetching agents data:', error));
    }, []);

    const handleRowClick = (agent) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleNavigate = () => {
        navigate('/add_agent');
    };

    return (
        <div className="container p-4 sm:p-6 md:p-8">
            <Header />
            <div className="flex justify-end">
                <button onClick={handleNavigate} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                    + Add Agent
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
                            {agentsData.map((agent) => (
                                <tr key={agent._id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(agent)}>
                                    <td className="px-4 py-2 flex items-center">
                                        <img src={agent.image} alt={agent.name} className="w-8 h-8 rounded-full mr-2 text[17px] bg-cover" />
                                        {agent.name}
                                    </td>
                                    <td className="px-4 py-2 text[17px]">{agent.city}</td>
                                    <td className="px-4 py-2 text[17px]">{agent.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for showing agent details */}
            {isModalOpen && selectedAgent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg border border-black shadow p-6 w-full max-w-sm">
                        <div className="flex justify-end mb-4">
                            <button onClick={closeModal} className="text-gray-500 text-3xl hover:text-black">&times;</button>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <img src={selectedAgent.image} alt={selectedAgent.name} className="w-32 h-32 rounded-full mb-2 bg-contain" />
                            <h2 className="text-[17px] font-semibold">{selectedAgent.name}</h2>
                            <p className="text-gray-500 text-[17px]">{selectedAgent.city}</p>
                            <p className="text-gray-500 text-[17px]">{selectedAgent.email}</p>

                            <div className="flex mt-2">
                                <button className="mr-2 p-2 bg-blue-100 rounded-full">
                                <a href='mailto:${selectedAgent.email}'>    <FaEnvelope size={20} className="text-blue-500" /></a>
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
                                    <p className="text-[12px]">{selectedAgent.experience} years</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaBriefcase size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Location</p>
                                    
                                        <p className="text-[12px]" >{selectedAgent.location}</p>
                                
                                </div>
                            </div>



                            <div className="flex items-center">
                                <FaUserCheck size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Active Status</p>
                                    <p className="text-[12px]">{selectedAgent.isActive ? 'Active' : 'Inactive'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Portfolio</h3>
                            <ul className="list-disc pl-5">
                              
                                    <li className="text-[13px]" >{selectedAgent.portfolio}</li>
                        
                            </ul>
                        </div>
                        <div className='mt-2'>
                            <h3 className="font-semibold mb-2">Skills</h3>
                            <ul className="list-disc pl-5">
                              
                                    <li className="text-[13px]" >{selectedAgent.skills}</li>
                        
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agents;
