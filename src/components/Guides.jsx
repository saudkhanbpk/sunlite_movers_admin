// import React from 'react';
// import { FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaClock, FaUserCheck } from 'react-icons/fa';
// import user from '../assets/img/user.png'
// import person from '../assets/img/user.png'
// import Header from './Header';
// const agentsData = [
//     { id: 1, name: 'Comela Swan', city: 'Abu Dhabi', country: 'UAE', image: user },
//     { id: 2, name: 'Comela Swan', city: 'Halain', country: 'UAE', image: user },
//     { id: 3, name: 'Comela Swan', city: 'Dubai', country: 'UAE', image: user },
//     { id: 4, name: 'Comela Swan', city: 'Halain', country: 'UAE', image: user },
//     { id: 5, name: 'Comela Swan', city: 'Abu Dhabi', country: 'UAE', image: user },
//     { id: 6, name: 'Comela Swan', city: 'Dubai', country: 'UAE', image: user },
// ];

// const Guides = () => {
//     return (
//         <div className="container p-4 sm:p-6 md:p-8">
//             <Header />
//             <div className="flex justify-center">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
//                     + Add Guide
//                 </button>
//             </div>

//             <div className="flex flex-col pt-5 lg:flex-row gap-6">
//                 <div className="lg:w-2/3">
//                     <div className="bg-white border border-black rounded-lg shadow overflow-hidden">
//                         <table className="w-full">
//                             <thead className="bg-[#E8F5FE]">
//                                 <tr>
//                                     <th className="px-4 py-2 text-left">Name</th>
//                                     <th className="px-4 py-2 text-left">City</th>
//                                     <th className="px-4 py-2 text-left">Country</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {agentsData.map((agent) => (
//                                     <tr key={agent.id} className="border-b">
//                                         <td className="px-4 py-2 flex items-center">
//                                             <img src={agent.image} alt={agent.name} className="w-8 h-8 rounded-full mr-2" />
//                                             {agent.name}
//                                         </td>
//                                         <td className="px-4 py-2">{agent.city}</td>
//                                         <td className="px-4 py-2">{agent.country}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 <div className="lg:w-1/3">
//                     <div className="bg-white rounded-lg border border-black shadow p-6">
//                         <div className="flex flex-col items-center mb-4">
//                             <img src={person} alt="Comela Swan" className="w-32 h-32 rounded-full mb-2" />
//                             <h2 className="text-xl font-semibold">Comela Swan</h2>
//                             <p className="text-gray-600">Abu Dhabi</p>
//                             <p className="text-gray-500">comelaswan@gmail.com</p>
//                             <div className="flex mt-2">
//                                 <button className="mr-2 p-2 bg-blue-100 rounded-full">
//                                     <FaEnvelope size={20} className="text-blue-500" />
//                                 </button>
//                                 <button className="p-2 bg-blue-100 rounded-full">
//                                     <FaPhone size={20} className="text-blue-500" />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 mb-6">
//                             <div className="flex items-center">
//                                 <FaBriefcase size={20} className="mr-2 text-gray-500" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">Experience</p>
//                                     <p className="font-semibold">5 years</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center">
//                                 <FaMapMarkerAlt size={20} className="mr-2 text-gray-500" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">Location</p>
//                                     <p className="font-semibold">Abu Dhabi</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center">
//                                 <FaClock size={20} className="mr-2 text-gray-500" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">Job review</p>
//                                     <p className="font-semibold">5 stars</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center">
//                                 <FaUserCheck size={20} className="mr-2 text-gray-500" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">Status</p>
//                                     <p className="font-semibold">Active</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="font-semibold mb-2">Skills</h3>
//                             <ul className="list-disc pl-5">
//                                 <li>Highly focused person with MS background</li>
//                                 <li>Highly focused person with MS background</li>
//                                 <li>Highly focused person with MS background</li>
//                                 <li>Highly focused person with MS background</li>
//                             </ul>
//                         </div>
//                         <div>
//                             <h3 className="font-semibold mb-2">Portfolio</h3>
//                             <ul className="list-disc pl-5">
//                                 <li>Highly focused person with MS background</li>
//                                 <li>Highly focused person with MS background</li>
//                                 <li>Highly focused person with MS background</li>
//                                 <li>Highly focused person with MS background</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Guides;

import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaClock, FaUserCheck } from 'react-icons/fa';
import user from '../assets/img/users.png';
import person from '../assets/img/person.png';
import Header from './Header';

// Sample data with at least 6 employees
const agentsData = [
    { id: 1, name: 'Comela Swan', city: 'Abu Dhabi', country: 'UAE', email: 'comelaswan@gmail.com', experience: '5 years', location: 'Abu Dhabi', jobReview: '5 stars', status: 'Active', skills: ['MS background', 'Problem Solving', 'Communication', 'Teamwork'], portfolio: ['Project A', 'Project B'], image: person },
    { id: 2, name: 'John Doe', city: 'Halain', country: 'UAE', email: 'johndoe@gmail.com', experience: '3 years', location: 'Halain', jobReview: '4 stars', status: 'Active', skills: ['Time Management', 'Leadership', 'MS background'], portfolio: ['Project X', 'Project Y'], image: user },
    { id: 3, name: 'Jane Smith', city: 'Dubai', country: 'UAE', email: 'janesmith@gmail.com', experience: '8 years', location: 'Dubai', jobReview: '5 stars', status: 'Active', skills: ['Creativity', 'Critical Thinking', 'MS background'], portfolio: ['Project M', 'Project N'], image: user },
    { id: 4, name: 'Lisa Ray', city: 'Dubai', country: 'UAE', email: 'lisaray@gmail.com', experience: '6 years', location: 'Dubai', jobReview: '5 stars', status: 'Active', skills: ['Leadership', 'Communication'], portfolio: ['Project O', 'Project P'], image: person },
    { id: 5, name: 'Mark Jones', city: 'Abu Dhabi', country: 'UAE', email: 'markjones@gmail.com', experience: '7 years', location: 'Abu Dhabi', jobReview: '5 stars', status: 'Active', skills: ['Creativity', 'Teamwork'], portfolio: ['Project C', 'Project D'], image: user },
    { id: 6, name: 'Sarah Connor', city: 'Halain', country: 'UAE', email: 'sarahconnor@gmail.com', experience: '10 years', location: 'Halain', jobReview: '5 stars', status: 'Active', skills: ['Problem Solving', 'Leadership'], portfolio: ['Project E', 'Project F'], image: person },
];

const Guides = () => {
    // State to track the selected agent
    const [selectedAgent, setSelectedAgent] = useState(agentsData[0]);

    // Function to handle row click
    const handleRowClick = (agent) => {
        setSelectedAgent(agent);
    };

    return (
        <div className="container p-4 sm:p-6 md:p-8">
            <Header />
            <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                    + Add Guide
                </button>
            </div>

            <div className="flex flex-col pt-5 lg:flex-row gap-6">
                {/* Left side: Agents Table */}
                <div className="lg:w-2/3">
                    <div className="bg-white border border-black rounded-lg shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#E8F5FE]">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">City</th>
                                    <th className="px-4 py-2 text-left">Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agentsData.map((agent) => (
                                    <tr key={agent.id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(agent)}>
                                        <td className="px-4 py-2 flex items-center">
                                            <img src={agent.image} alt={agent.name} className="w-8 h-8 rounded-full mr-2" />
                                            {agent.name}
                                        </td>
                                        <td className="px-4 py-2">{agent.city}</td>
                                        <td className="px-4 py-2">{agent.country}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right side: Selected Agent Details */}
                <div className="lg:w-1/3">
                    {selectedAgent && (
                        <div className="bg-white rounded-lg border border-black shadow p-6">
                            <div className="flex flex-col items-center mb-4">
                                <img src={selectedAgent.image} alt={selectedAgent.name} className="w-32 h-32 rounded-full mb-2" />
                                <h2 className="text-xl font-semibold">{selectedAgent.name}</h2>
                                <p className="text-gray-600">{selectedAgent.location}</p>
                                <p className="text-gray-500">{selectedAgent.email}</p>
                                <div className="flex mt-2">
                                    <button className="mr-2 p-2 bg-blue-100 rounded-full">
                                        <FaEnvelope size={20} className="text-blue-500" />
                                    </button>
                                    <button className="p-2 bg-blue-100 rounded-full">
                                        <FaPhone size={20} className="text-blue-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center">
                                    <FaBriefcase size={20} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Experience</p>
                                        <p className="font-semibold">{selectedAgent.experience}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt size={20} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-semibold">{selectedAgent.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaClock size={20} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Job review</p>
                                        <p className="font-semibold">{selectedAgent.jobReview}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaUserCheck size={20} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Status</p>
                                        <p className="font-semibold">{selectedAgent.status}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div>
                                <h3 className="font-semibold mb-2">Skills</h3>
                                <ul className="list-disc pl-5">
                                    {selectedAgent.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Portfolio Section */}
                            <div>
                                <h3 className="font-semibold mb-2">Portfolio</h3>
                                <ul className="list-disc pl-5">
                                    {selectedAgent.portfolio.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Guides;
