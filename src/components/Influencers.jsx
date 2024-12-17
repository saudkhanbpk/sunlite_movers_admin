import React, { useEffect, useState } from "react";
import Header from "./Header";
import InfluencerCard from "./InfluencerCard";
import { BsUpload } from "react-icons/bs";
import { BaseUrl } from "../BaseUrl";
import { toast } from "react-toastify";
import axios from "axios";

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    facebook: "",
  });

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/influencers`);
        if (!response.ok) throw new Error("Failed to fetch influencers");
        const data = await response.json();
        setInfluencers(data);
        setFilteredInfluencers(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchInfluencers();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = influencers.filter((influencer) =>
      influencer.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInfluencers(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("instagram", formData.instagram);
    data.append("twitter", formData.twitter);
    data.append("tiktok", formData.tiktok);
    data.append("facebook", formData.facebook);
    if (file) data.append("image", file);

    try {
      const response = await axios.post(`${BaseUrl}/api/influencers`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setInfluencers([...influencers, response.data.influencer]);
      toast.success("Influencer added successfully");
      setIsFormVisible(false);
      setFormData({
        name: "",
        instagram: "",
        twitter: "",
        tiktok: "",
        facebook: "",
      });
    } catch (error) {
      toast.error("Failed to add influencer");
    }
  };

  const handleEdit = (influencer) => {
    setSelectedInfluencerId(influencer._id);
    setFormData({
      name: influencer.name,
      instagram: influencer.instagram,
      twitter: influencer.twitter,
      tiktok: influencer.tiktok,
      facebook: influencer.facebook,
    });
    setFileName("");
    setFile(null);
    setIsEditMode(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BaseUrl}/api/influencers/${id}`, { method: "DELETE" });
      setInfluencers(influencers.filter((inf) => inf._id !== id));
      toast.success("Influencer deleted successfully");
    } catch (err) {
      toast.error("Failed to delete influencer");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("instagram", formData.instagram);
    data.append("twitter", formData.twitter);
    data.append("tiktok", formData.tiktok);
    data.append("facebook", formData.facebook);
    if (file) data.append("image", file);

    try {
      const response = await axios.put(
        `${BaseUrl}/api/influencers/${selectedInfluencerId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setInfluencers(
        influencers.map((inf) =>
          inf._id === selectedInfluencerId ? response.data.influencer : inf
        )
      );
      toast.success("Influencer updated successfully");
      setIsFormVisible(false);
      setIsEditMode(false);
      setSelectedInfluencerId(null);
    } catch (error) {
      toast.error("Failed to update influencer");
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <Header onSearch={handleSearch} />
      <div className="w-full">
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              setIsEditMode(false);
              setFormData({
                name: "",
                instagram: "",
                twitter: "",
                tiktok: "",
                facebook: "",
              });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            {isFormVisible ? "Cancel" : "Add New Influencer"}
          </button>
        </div>

        {isFormVisible && (
          <form
            onSubmit={isEditMode ? handleUpdate : handleSubmit}
            className="bg-gray-100 p-6 rounded-lg shadow-md mb-8"
          >
            <div className="flex justify-center mb-3 items-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative">
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

            {["name", "instagram", "twitter", "tiktok", "facebook"].map(
              (field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)} URL
                  </label>
                  <input
                    type="text"
                    name={field}
                    className="w-full px-3 py-2 border rounded-lg"
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                </div>
              )
            )}

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
            >
              {isEditMode ? "Update Influencer" : "Add Influencer"}
            </button>
          </form>
        )}

        {!isFormVisible && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredInfluencers.length === 0 ? (
              <p className="text-gray-600 text-center col-span-3">
                No influencers found
              </p>
            ) : (
              filteredInfluencers.map((influencer) => (
                <InfluencerCard
                  key={influencer._id}
                  influencer={influencer}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Influencers;
