import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsUpload } from "react-icons/bs";
import { BaseUrl } from "../BaseUrl";
import { FaSpinner, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Header from "./Header";

const AddLocation = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [locations, setLocations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filteredLocation, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "");
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/getalllocations`);
      setLocations(response.data.locations);
      setFilteredLocations(response.data.locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.title);
    if (selectedFile) data.append("image", selectedFile);

    setLoading(true);
    try {
      const response = editMode
        ? await axios.put(`${BaseUrl}/api/locations/${editId}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post(`${BaseUrl}/api/locations`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      toast.success(
        editMode
          ? "Location updated successfully!"
          : "Location added successfully!"
      );
      setFormData({ title: "", image: "" });
      setSelectedFile(null);
      setEditMode(false);
      setEditId(null);
      setShow(false);
      fetchLocations();
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error("Error saving location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (location) => {
    setEditMode(true);
    setEditId(location._id);
    setFormData({ title: location.name });
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUrl}/api/locations/${id}`);
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location._id !== id)
      );
      toast.success("Location deleted successfully");
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Error deleting location.");
    }
  };

  const showMoreCards = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const showLessCards = () => {
    setVisibleCount(6);
  };
  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      <div className="p-4 sm:p-6 md:p-8">
        <Header onSearch={handleSearch} />
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setShow(true);
              if (show) {
                setEditMode(false);
                setFormData({ title: "", image: "" });
              }
            }}
            className="bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold"
          >
            Add New Location
          </button>
        </div>
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Locations</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredLocation.slice(0, visibleCount).map((location) => (
              <div
                key={location._id}
                className="bg-white shadow-md rounded-lg p-4 relative"
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-medium mt-2 text-center">
                  {location.name}
                </h2>
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => handleEdit(location)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(location._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredLocation.length > visibleCount && (
            <div className="flex justify-center mt-4">
              <button
                onClick={showMoreCards}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                More
              </button>
            </div>
          )}
          {visibleCount > 6 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={showLessCards}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Less
              </button>
            </div>
          )}
        </div>

        {show && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setShow(false)}
          >
            <div
              className="md:w-[50%] p-6 bg-[#E8F5FE] rounded-lg shadow-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center">
                {editMode ? "Update Location" : "Add New Location"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center items-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative">
                  <div className="text-center">
                    <BsUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload picture
                    </span>
                  </div>
                  <input
                    type="file"
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
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Country name"
                  className="w-full py-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  disabled={loading}
                  type="submit"
                  className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : editMode ? (
                    "Update Location"
                  ) : (
                    "Create now"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLocation;
