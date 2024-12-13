import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const UpdatePackage = () => {
  const location = useLocation();
  const pkg = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: pkg.title || "",
    description: pkg.description || "",
    price: pkg.price || "",
    days: pkg.days || 0,
    nights: pkg.nights || 0,
    hours: pkg.hours || 0,
    startTime: pkg.startTime || "",
    endTime: pkg.endTime || "",
    pickupTime: pkg.pickupTime || "",
    dropoffTime: pkg.dropoffTime || "",
    policy: pkg.policy || "",
    image: [pkg.image],
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
    setSelectedFile(files);
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
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("pickupTime", formData.pickupTime);
    data.append("dropoffTime", formData.dropoffTime);
    data.append("policy", formData.policy);

    if (selectedFile)
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
          <label className="block text-lg">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Pickup Time</label>
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Drop off Time</label>
          <input
            type="time"
            name="dropoffTime"
            value={formData.dropoffTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Booking Policy</label>
          <input
            type="text"
            name="policy"
            value={formData.policy}
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
          />
          {formData.image && Array.isArray(formData.image) && (
            <div className="mt-1 text-gray-500">
              <p>Images:</p>
              <div className="flex flex-wrap gap-2">
                {formData.image.flat().map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt={`Uploaded file ${index + 1}`}
                    className="w-16 h-16 object-cover border rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

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
