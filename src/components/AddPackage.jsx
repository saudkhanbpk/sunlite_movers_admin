import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsUpload } from "react-icons/bs";
import { BaseUrl } from "../BaseUrl";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPackage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    locationId: "",
    date: "",
    days: "",
    nights: "",
    hours: "",
    price: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const [selectedFile, setSelectedFile] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/getAllLocations`);
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files);
    setFileName(files.map((file) => file.name).join(", "));
  };

  // const convertTo12HourFormat = (time) => {
  //   const [hours, minutes] = time.split(":");
  //   const hoursInt = parseInt(hours, 10);
  //   const period = hoursInt >= 12 ? "PM" : "AM";
  //   const hours12 = hoursInt % 12 || 12;
  //   return `${hours12}:${minutes} ${period}`;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert times to 12-hour format
    // const formattedStartTime = convertTo12HourFormat(formData.startTime);
    // const formattedEndTime = convertTo12HourFormat(formData.endTime);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("locationId", formData.locationId);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("days", formData.days);
    formDataToSend.append("nights", formData.nights);
    formDataToSend.append("hours", formData.hours);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("startTime", formData.startTime);
    formDataToSend.append("endTime", formData.endTime);
    selectedFile.forEach((file) => {
      formDataToSend.append(`image`, file);
    });
    setLoading(true);

    try {
      const response = await axios.post(
        `${BaseUrl}/api/addpackage`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Package created successfully!");
      setTimeout(() => {
        navigate("/packages");
      }, 3000);
      console.log("Package created:", response.data);
    } catch (error) {
      console.error("Error creating package:", error);
      toast.error("Error creating package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md p-6 md:ml-10 bg-[#E8F5FE] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Package
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File upload section */}
          <div className="flex justify-center items-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative">
            <div className="text-center">
              <BsUpload className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Upload picture
              </span>
            </div>
            <input
              type="file"
              name="image"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {fileName && (
            <p className="text-sm text-gray-600 mt-2">
              Selected file: {fileName}
            </p>
          )}

          {/* Form fields */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Tour name"
            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Tour destination"
            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Tour duration inputs */}
          <div>
            <label>Tour Duration</label>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="Days"
                className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="nights"
                value={formData.nights}
                onChange={handleChange}
                placeholder="Nights"
                className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                placeholder="Hours"
                className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>

          {/* Time Slot Inputs */}
          <div>
            <label>Time Slot (Optional)</label>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600">to</span>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded-md"
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Add Package"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
