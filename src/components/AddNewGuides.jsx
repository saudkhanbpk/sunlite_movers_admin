import React, { useState } from 'react';
import axios from 'axios';
import { BsUpload } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseUrl } from '../BaseUrl';
import { useNavigate } from 'react-router-dom';

const AddNewGuides = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        city: '',
        location: '',
        portfolio: [], // Changed to array for multiple portfolio entries
        experience: '',
        skills: [], // Array for skills
        status: false,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [skillInput, setSkillInput] = useState('');
    const [portfolioInput, setPortfolioInput] = useState(''); // For portfolio input
    const navigate = useNavigate()
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

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    // Handle skill input
    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const skill = skillInput.trim();
            if (skill && !formData.skills.includes(skill)) {
                setFormData(prevState => ({
                    ...prevState,
                    skills: [...prevState.skills, skill],
                }));
            }
            setSkillInput(''); // Clear input after adding skill
        }
    };

    // Handle portfolio input
    const handlePortfolioKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const portfolioItem = portfolioInput.trim();
            if (portfolioItem && !formData.portfolio.includes(portfolioItem)) {
                setFormData(prevState => ({
                    ...prevState,
                    portfolio: [...prevState.portfolio, portfolioItem],
                }));
            }
            setPortfolioInput(''); // Clear input after adding portfolio item
        }
    };

    // Remove a skill from the list
    const removeSkill = (skillToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            skills: prevState.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    // Remove a portfolio item from the list
    const removePortfolio = (portfolioToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            portfolio: prevState.portfolio.filter(item => item !== portfolioToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.email || !formData.contact || !formData.city || !formData.location || !formData.skills.length || !formData.portfolio.length) {
            toast.error('Please fill all the required fields!');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('contact', formData.contact);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('experience', formData.experience);

        // Append skills and portfolios arrays directly
        formData.skills.forEach((skill, index) => {
            formDataToSend.append(`skills[${index}]`, skill);
        });
        formData.portfolio.forEach((item, index) => {
            formDataToSend.append(`portfolio[${index}]`, item);
        });

        formDataToSend.append('isActive', formData.isActive);

        if (selectedFile) {
            formDataToSend.append('image', selectedFile);
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BaseUrl}/api/addguides`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Agent added successfully!');
            console.log('Agent created:', response.data);

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                contact: '',
                city: '',
                location: '',
                portfolio: [],
                experience: '',
                skills: [],
                status: false,
            });
            setSelectedFile(null);
            setFileName('');
            setSkillInput('');
            setPortfolioInput('');
            navigate('/guides')

        } catch (error) {
            console.error('Error creating agent:', error);
            toast.error('Error adding agent. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center'>
            <div className="max-w-md p-6 md:ml-10 bg-[#E8F5FE] rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Guide</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* File upload */}
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

                    {/* Other form fields */}
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
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Country"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Experience"
                        className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Portfolio input and tag-like feature */}
                    <div className="w-full py-3">
                        <input
                            type="text"
                            value={portfolioInput}
                            onChange={(e) => setPortfolioInput(e.target.value)}
                            onKeyPress={handlePortfolioKeyPress}
                            placeholder="Portfolio (press enter to add)"
                            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-2 flex flex-wrap">
                            {formData.portfolio.map((item, index) => (
                                <div key={index} className="bg-green-200 text-green-700 rounded-full px-3 py-1 mr-2 mb-2 flex items-center">
                                    <span>{item}</span>
                                    <button
                                        onClick={() => removePortfolio(item)}
                                        className="ml-2 text-red-500"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skill input */}
                    <div className="w-full py-3">
                        <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={handleSkillKeyPress}
                            placeholder="Skills (press enter to add)"
                            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-2 flex flex-wrap">
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="bg-blue-200 text-blue-700 rounded-full px-3 py-1 mr-2 mb-2 flex items-center">
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 text-red-500"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active status */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="status"
                            checked={formData.status}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="isActive" className="text-sm">Is Active</label>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className={`w-full py-3 mt-4 ${loading ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-md`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex justify-center items-center">
                                <FaSpinner className="animate-spin h-5 w-5 mr-3" />
                                Adding...
                            </span>
                        ) : 'Add Agent'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddNewGuides;
