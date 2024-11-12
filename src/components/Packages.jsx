import React, { useEffect, useState } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';

function Packages() {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState({});

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/getpackages`);
                setPackages(response.data.packages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const handleNewPackage = () => {
        navigate('/add_package');
    };

    const handlePackageClick = (pkg) => {
        navigate('/package-details', { state: pkg });
    };

    const toggleDescription = (id) => {
        setShowFullDescription((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getShortDescription = (description) => {
        const words = description.split(' ');
        return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description;
    };

    return (
        <div className='w-full p-8'>
            <Header />
            <div className='md:flex gap-4'>
                <div className='md:w-2/3'>
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-bold self-center'>New Package</h2>
                        <div>
                            <button onClick={handleNewPackage} className='bg-[#6AD2FF] text-white md:p-3 p-2 rounded-xl font-semibold'>Create Package</button>
                        </div>
                    </div>

                    {loading ? (
                        <div className='flex justify-center items-center h-64'>
                            <div className="loader"></div>
                        </div>
                    ) : (
                        packages.map((pkg, ind) => (
                            <div
                                key={ind}
                                className='w-full bg-gray-100 p-3 mt-2 rounded-xl md:flex gap-3'
                            >
                                <div onClick={() => handlePackageClick(pkg)}>
                                    <img src={pkg.image} alt='Package' className='md:w-[300px] w-full rounded-md cursor-pointer' />
                                </div>
                                <div className='md:w-[400px] p-2'>
                                    <h1 className='text-2xl font-bold'>{pkg.title}</h1>
                                    <p className='mt-5'>
                                        {showFullDescription[pkg.id] ? pkg.description : getShortDescription(pkg.description)}
                                    </p>
                                    {pkg.description.split(' ').length > 20 && (
                                        <button
                                            onClick={() => toggleDescription(pkg.id)}
                                            className='text-blue-500 mt-2'>
                                            {showFullDescription[pkg.id] ? 'View Less' : 'View All'}
                                        </button>
                                    )}
                                    <div className='flex justify-between mt-8'>
                                        <p>Price<br /><a className='text-blue-500 font-bold text-xl'>${pkg.price}</a></p>

                                    </div>
                                    <div className='flex justify-between mt-8'>
                                        <h2>Durations</h2>
                                        <div className='flex gap-2'>
                                            <p>Days {pkg.days},</p>
                                            <p>Nights {pkg.nights},</p>
                                            <p>Hours {pkg.hours}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='md:w-1/3'>
                    <h4 className='text-xl font-bold self-center mt-2'>Popular Packages</h4>
                    <div className='mt-5 p-2 bg-gray-100 rounded-xl'>
                        {packages.map(pkg => (
                            <div
                                key={pkg.id}
                                className='flex gap-2 bg-white rounded-xl p-2 mb-2'>
                                <img src={pkg.image} alt={pkg.title} className='w-24 h-16 object-cover rounded-xl' />
                                <div>
                                    <h4 className='font-[600] text-base'>{pkg.title}</h4>
                                    <p>{pkg.locationId?.name}</p>
                                    <div className='flex'>
                                        {Array(pkg.rating).fill().map((_, i) => (
                                            <MdOutlineStarPurple500 key={i} className='text-yellow-400' />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .loader {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #6AD2FF;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

export default Packages;
