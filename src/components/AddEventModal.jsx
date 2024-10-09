import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useRef, useState } from "react";

const AddEventModal = ({ handleSave, loading  }) => {
  const dialogRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    eventType: "",
  });

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveEvent = () => {
    handleSave(formData, closeModal, clearForm);
  };

  const clearForm = () => {
    setFormData({
      title: "",
      date: "",
      description: "",
      eventType: "",
    });
  };

  return (
    <div className="w-full">
      <button
        className="bg-green-700 px-3 py-1 rounded-sm text-white flex items-center gap-3"
        onClick={openModal}
      >
        <FaPlus />
        Add Event
      </button>
      <dialog
        ref={dialogRef}
        className="rounded-md p-5 shadow-lg w-full max-w-2xl "
      >
        <h2 className="text-xl font-bold mb-4 text-green-700">Add Event</h2>
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              placeholder="Event Title"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
              placeholder="Event Description"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Event Type</label>
            <select
              name="eventType"
              id="eventType"
              className="capitalize border outline-none p-2 w-full rounded"
              value={formData.eventType}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Event Type
              </option>
              <option value="installation">installation</option>
              <option value="general">general</option>
              <option value="meetings">meetings</option>
            </select>
          </div>
        </form>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-green-700 text-white px-3 py-1 rounded-sm"
            onClick={saveEvent}
            disabled={loading}
          >
            {loading ? (
              <span className="block w-5 h-5">
                <LoadingSpinner />
              </span>
            ) : (
              "Save"
            )}
          </button>
          <button
            className="rounded-full w-4 h-4 absolute top-3 right-3 text-red-500"
            onClick={closeModal}
          >
            <RxCross2 />
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default AddEventModal;