import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Home, Plane, MapPin } from "lucide-react";
import { BaseUrl } from "../BaseUrl";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${BaseUrl}/api/services`);
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      setServices(data);
      console.log("Fetched Services:", data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/api/services/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete service");
      }

      const result = await response.json();
      toast.success(result.msg);

      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== id)
      );
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEdit = (service) => {
    setEditService(service);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editService.name);
    formData.append("description", editService.description);
    formData.append("selectedType", editService.selectedType);

    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }

    try {
      const response = await fetch(
        `${BaseUrl}/api/services/${editService._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      const result = await response.json();
      toast.success(result.msg);

      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const getServiceIcon = (type) => {
    switch (type.trim().toLowerCase()) {
      case "transport":
        return <Truck size={24} />;
      case "accommodation":
        return <Home size={24} />;
      case "flight":
        return <Plane size={24} />;
      case "guide tour":
        return <MapPin size={24} />;
      default:
        return null;
    }
  };

  const filteredServices = services.filter((service) => {
    const serviceName = service.name ? service.name.toLowerCase().trim() : "";
    const serviceType = service.selectedType
      ? service.selectedType.toLowerCase().trim()
      : "";
    const searchLower = searchQuery.toLowerCase().trim();
    return (
      serviceName.includes(searchLower) || serviceType.includes(searchLower)
    );
  });

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 rounded-xl min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Service List</h2>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by name or type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
        />
        <FiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      <div className="flex justify-end mb-6">
        <Link
          to="/add_services"
          className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold"
        >
          Add Service
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredServices.slice(0, visibleCount).length > 0 ? (
          filteredServices.slice(0, visibleCount).map((service) => (
            <div
              key={service._id}
              className="cursor-pointer p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-gray-100 text-gray-800 shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div>{getServiceIcon(service.selectedType)}</div>
                <div className="flex items-center gap-2 text-[20px]">
                  <div
                    className="text-yellow-300 cursor-pointer"
                    onClick={() => handleEdit(service)}
                  >
                    <FaRegEdit />
                  </div>
                  <div
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(service._id)}
                  >
                    <MdOutlineDeleteOutline />
                  </div>
                </div>
              </div>

              {/* Display service image */}
              {service.image && (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}

              <div>
                <p className="font-bold text-lg">{service.title}</p>
                <p className="pt-3 text-sm">
                  Description:{" "}
                  {expandedServiceId === service._id ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: service.description.replace(/\n/g, "<br />"),
                      }}
                    />
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${service.description
                          .slice(0, 120)
                          .replace(/\n/g, "<br />")}...`,
                      }}
                    />
                  )}
                  {service.description.length > 120 && (
                    <button
                      className="text-blue-500"
                      onClick={() =>
                        setExpandedServiceId(
                          expandedServiceId === service._id ? null : service._id
                        )
                      }
                    >
                      {expandedServiceId === service._id
                        ? "View Less"
                        : "View More"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No services found matching your search.</p>
        )}
      </div>

      {filteredServices.length > visibleCount && (
        <div className="flex justify-center mb-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Show More
          </button>
        </div>
      )}

      {/* Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Edit Service</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700">Service Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editService?.title || ""}
                  onChange={(e) =>
                    setEditService({ ...editService, title: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editService?.description || ""}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Upload Image:</label>
                <input
                  type="file"
                  required
                  name="image"
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
