import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const UpdatePackage = () => {
  const location = useLocation();
  const pkg = location.state;
  console.log("pkg", pkg);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: pkg.title || "",
    description: pkg.description || "",
    price: pkg.price || "",
    days: pkg.days || "",
    nights: pkg.nights || "",
    hours: pkg.hours || "",
    image: [],
  });
  console.log("formData", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        image: [...prevData.image, ...filesArray],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("days", formData.days);
    data.append("nights", formData.nights);
    data.append("hours", formData.hours);

    formData.image.forEach((image) => {
      data.append("image", image);
    });
    setLoading(true);

    try {
      const response = await axios.put(
        `${BaseUrl}/api/updatepackage/${pkg._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Package updated successfully!");
        navigate("/packages");
      }
    } catch (error) {
      console.error("Error updating package:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update the package";
      toast.error(errorMessage);
    }
  };

  const getImageName = (file) => {
    return file ? file.name : "";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Update Package</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Days</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Nights</label>
          <input
            type="number"
            name="nights"
            value={formData.nights}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Hours</label>
          <input
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {formData.image && (
            <p className="mt-1 text-gray-500">
              Image Name: {getImageName(formData.image[0])}
            </p>
          )}
        </div>

        {formData.image.length > 0 && (
          <div className="mt-2">
            {formData.image.map((file, index) => (
              <p key={index} className="text-gray-500">
                Image {index + 1}: {getImageName(file)}
              </p>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> {/* Spinner icon */}
                Processing...
              </div>
            ) : (
              "Update Package"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePackage;
