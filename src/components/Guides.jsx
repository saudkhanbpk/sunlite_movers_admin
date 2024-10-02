import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaClock, FaUserCheck } from 'react-icons/fa';
import user from '../assets/img/user.png'
import person from '../assets/img/user.png'
import Header from './Header';
const agentsData = [
    { id: 1, name: 'Comela Swan', city: 'Abu Dhabi', country: 'UAE', image: user },
    { id: 2, name: 'Comela Swan', city: 'Halain', country: 'UAE', image: user },
    { id: 3, name: 'Comela Swan', city: 'Dubai', country: 'UAE', image: user },
    { id: 4, name: 'Comela Swan', city: 'Halain', country: 'UAE', image: user },
    { id: 5, name: 'Comela Swan', city: 'Abu Dhabi', country: 'UAE', image: user },
    { id: 6, name: 'Comela Swan', city: 'Dubai', country: 'UAE', image: user },
];

const Guides = () => {
    const [show, setShow] = useState(false)
    return (
        <div className="container p-4 sm:p-6 md:p-8">
            <Header />
            <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                    + Add Guide
                </button>
            </div>

            <div className="flex flex-col pt-5 lg:flex-row gap-6">
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
                                    <tr onClick={() => setShow(!show)} key={agent.id} className="border-b">
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
                {show ?
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg border border-black shadow p-6">
                            <div className="flex flex-col items-center mb-4">
                                <img src={person} alt="Comela Swan" className="w-32 h-32 rounded-full mb-2" />
                                <h2 className="text-xl font-semibold">Comela Swan</h2>
                                <p className="text-gray-600">Abu Dhabi</p>
                                <p className="text-gray-500">comelaswan@gmail.com</p>
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
                                        <p className="font-semibold">5 years</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt size={20} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-semibold">Abu Dhabi</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaClock size={20} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Job review</p>
                                        <p className="font-semibold">5 stars</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaUserCheck size={20} className="mr-2 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Status</p>
                                        <p className="font-semibold">Active</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Skills</h3>
                                <ul className="list-disc pl-5">
                                    <li>Highly focused person with MS background</li>
                                    <li>Highly focused person with MS background</li>
                                    <li>Highly focused person with MS background</li>
                                    <li>Highly focused person with MS background</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Portfolio</h3>
                                <ul className="list-disc pl-5">
                                    <li>Highly focused person with MS background</li>
                                    <li>Highly focused person with MS background</li>
                                    <li>Highly focused person with MS background</li>
                                    <li>Highly focused person with MS background</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    ""
                }
            </div>
        </div>
    );
};

export default Guides;
