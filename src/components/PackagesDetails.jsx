import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../BaseUrl';
import { toast } from 'react-toastify';
const PackagesDetails = () => {
    const location = useLocation();
    const pkg = location.state;
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BaseUrl}/api/deletepackage/${pkg._id}`);
            if (response.status === 200) {
                setTimeout(() => {
                    navigate('/packages');
                }, 3000)
            }
            toast.success(response.data.msg)
        } catch (error) {
            console.error('Error deleting package:', error);
            const errorMessage = error.response?.data?.message || 'Failed to delete the package';
            toast.error(errorMessage);
        }
    };

    const handleUpdate = () => {
        navigate('/update-package', { state: pkg });
    };

    if (!pkg) {
        return <p>Loading package details...</p>;
    }

    return (
        <div className='p-8'>
            <div className='flex justify-end gap-4 mb-6'>
                <button
                    className='bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600'
                    onClick={handleUpdate}
                    aria-label="Update package"
                >
                    Update
                </button>
                <button
                    className='bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600'
                    onClick={handleDelete}
                    aria-label="Delete package"
                >
                    Delete
                </button>
            </div>

            <h1 className='text-2xl font-bold'>{pkg.title}</h1>
            <img src={pkg.image} alt={pkg.title} className='w-full rounded-xl pt-6' />
            <p className='mt-5'>{pkg.description}</p>
            <div className='flex justify-between mt-8'>
                <p className='text-xl'>Price: <span className='text-blue-500 font-bold'>${pkg.price}</span></p>
                <div className='flex gap-2'>
                    <h2 className='text-xl'>Duration:</h2>
                    <p className='text-xl'>{pkg.days} {pkg.days > 1 ? 'Days' : 'Day'},</p>
                    <p className='text-xl'>{pkg.nights} {pkg.nights > 1 ? 'Nights' : 'Nights'},</p>
                    <p className='text-xl'>{pkg.hours} {pkg.hours > 1 ? 'Hours' : 'Hour'}</p>
                </div>
            </div>
        </div>
    );
}

export default PackagesDetails;
