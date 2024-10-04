import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaClock, FaUserCheck } from 'react-icons/fa';
import user from '../assets/img/users.png';
import person from '../assets/img/person.png';
import Header from './Header';

// Sample data with at least 6 employees
const agentsData = [
    { id: 1, name: 'Comela Swan', city: 'Abu Dhabi', country: 'UAE', email: 'comelaswan@gmail.com', experience: '5 years', location: 'Abu Dhabi', jobReview: '5 stars', status: 'Active', skills: ['MS background', 'Problem Solving', 'Communication', 'Teamwork'], portfolio: ['Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background'], image: person },
    { id: 2, name: 'John Doe', city: 'Halain', country: 'UAE', email: 'johndoe@gmail.com', experience: '3 years', location: 'Halain', jobReview: '4 stars', status: 'Active', skills: ['Time Management', 'Leadership', 'MS background'], portfolio: ['Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background'], image: user },
    { id: 3, name: 'Jane Smith', city: 'Dubai', country: 'UAE', email: 'janesmith@gmail.com', experience: '8 years', location: 'Dubai', jobReview: '5 stars', status: 'Active', skills: ['Creativity', 'Critical Thinking', 'MS background'], portfolio: ['Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background'], image: user },
    { id: 4, name: 'Lisa Ray', city: 'Dubai', country: 'UAE', email: 'lisaray@gmail.com', experience: '6 years', location: 'Dubai', jobReview: '5 stars', status: 'Active', skills: ['Leadership', 'Communication'], portfolio: ['Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background'], image: person },
    { id: 5, name: 'Mark Jones', city: 'Abu Dhabi', country: 'UAE', email: 'markjones@gmail.com', experience: '7 years', location: 'Abu Dhabi', jobReview: '5 stars', status: 'Active', skills: ['Creativity', 'Teamwork'], portfolio: ['Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background'], image: user },
    { id: 6, name: 'Sarah Connor', city: 'Halain', country: 'UAE', email: 'sarahconnor@gmail.com', experience: '10 years', location: 'Halain', jobReview: '5 stars', status: 'Active', skills: ['Problem Solving', 'Leadership'], portfolio: ['Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background', 'Highly focused person with MS background'], image: person },
];

const Drivers = () => {
    // State to track the selected agent and modal visibility
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to handle row click and open modal
    const handleRowClick = (agent) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container p-4 sm:p-6 md:p-8">
            <Header />
            <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
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
                            {agentsData.map((agent) => (
                                <tr key={agent.id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(agent)}>
                                    <td className="px-4 py-2 flex items-center">
                                        <img src={agent.image} alt={agent.name} className="w-8 h-8 rounded-full mr-2 text-[17px]" />
                                        {agent.name}
                                    </td>
                                    <td className="px-4 py-2 text-[17px]">{agent.city}</td>
                                    <td className="px-4 py-2 text-[17px]">{agent.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for showing agent details */}
            {isModalOpen && selectedAgent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg border border-black shadow p-6 w-full h-[500px] overflow-y-scroll max-w-sm">
                        <div className="flex justify-end mb-4">
                            <button onClick={closeModal} className="text-gray-500 text-3xl hover:text-black">&times;</button>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <img src={selectedAgent.image} alt={selectedAgent.name} className="w-32 h-32 rounded-full mb-2" />
                            <h2 className="text-[17px] font-semibold">{selectedAgent.name}</h2>
                            <p className="text-gray-600 text-[17px]">{selectedAgent.location}</p>
                            <p className="text-gray-500 text-[17px]">{selectedAgent.email}</p>
                            <div className="flex mt-2">
                                <button className="mr-2 p-2 bg-blue-100 rounded-full">
                                    <FaEnvelope size={20} className="text-blue-500" />
                                </button>
                                <button className="p-2 bg-blue-100 rounded-full">
                                    <FaPhone size={20} className="text-blue-500" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 bg-[#E8F5FE] p-4">
                            <div className="flex items-center">
                                <FaBriefcase size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Experience</p>
                                    <p className="text-[12px]">{selectedAgent.experience}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarkerAlt size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Location</p>
                                    <p className="text-[12px]">{selectedAgent.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaClock size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Job review</p>
                                    <p className="text-[12px]">{selectedAgent.jobReview}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaUserCheck size={20} className="mr-2 text-gray-500" />
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-600">Status</p>
                                    <p className="text-[12px]">{selectedAgent.status}</p>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div>
                            <h3 className="font-semibold mb-2">Car description</h3>
                            <ul className="list-disc pl-5">
                                {selectedAgent.skills.map((skill, index) => (
                                    <li className="text-[13px]" key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Portfolio Section */}
                        <div>
                            <h3 className="font-semibold mb-2">Portfolio</h3>
                            <ul className="list-disc pl-5">
                                {selectedAgent.portfolio.map((item, index) => (
                                    <li className="text-[13px]" key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Drivers;
