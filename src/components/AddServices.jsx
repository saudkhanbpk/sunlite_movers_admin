import React, { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { BaseUrl } from '../BaseUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddServices = () => {
  const naviagete = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('Flight Book');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.title : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('selectedType', selectedType);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch(`${BaseUrl}/api/services`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg);
        naviagete('/service_list')
        setTitle('');
        setDescription('');
        setSelectedType('Flight Book');
        setFileName('');
        setSelectedFile(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Error creating service');
      }
    } catch (error) {
      toast.error('An error occurred while creating the service');
      console.error('Error:', error);
    }
  };


  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Add New Service</h2>
      <form onSubmit={handleSubmit}>
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
            required
          />
        </div>
        {fileName && (
          <p className="text-sm text-gray-600 mt-2">Selected file: {fileName}</p>
        )}

        <div className="pt-5">
          <input
            type="text"
            name="title"
            placeholder="Service Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Service Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />


        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddServices;