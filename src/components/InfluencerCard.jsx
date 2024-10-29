import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaEdit, FaTrash } from 'react-icons/fa';

const InfluencerCard = ({ influencer, onEdit, onDelete }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 relative">
        <div className="relative group">
            <img
                src={influencer.image}
                alt={influencer.name}
                className="w-full h-56 object-cover"
            />
            {/* Overlay with Edit/Delete Icons */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(influencer)}
                    className="text-white mx-2 hover:text-yellow-400 transition-colors"
                >
                    <FaEdit size={24} />
                </button>
                <button
                    onClick={() => onDelete(influencer._id)}
                    className="text-white mx-2 hover:text-red-400 transition-colors"
                >
                    <FaTrash size={24} />
                </button>
            </div>
        </div>
        <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{influencer.name}</h3>
            <div className="flex justify-center space-x-6 mt-4">
                <a
                    href={influencer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                    <FaInstagram size={28} />
                </a>
                <a
                    href={influencer.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                    <FaTwitter size={28} />
                </a>
                <a
                    href={influencer.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-red-600 transition-colors"
                >
                    <FaTiktok size={28} />
                </a>
                <a
                    href={influencer.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                    <FaFacebook size={28} />
                </a>
            </div>
        </div>
    </div>
);

export default InfluencerCard;
