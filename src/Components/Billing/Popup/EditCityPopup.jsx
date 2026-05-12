import { useEffect, useState } from "react";
import { saveCity } from "../../../api/endpoints/authApi";

function EditCityPopup({ onClose, onSuccess, initialData }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCity(initialData.city_name || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      alert("Please enter city name");
      return;
    }
    setLoading(true);

    try {
      const response = await saveCity({
        id: initialData?.id,
        city_name: city
      });

      if (response && response.message) {
        alert(response.message);
      }

      if (response && (response.success === 1 || response.status === true)) {
        onSuccess();
        onClose();
      }

    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-md px-3">

      <div className="bg-white w-[95%] max-w-md h-auto rounded-xl shadow-lg p-6 sm:p-8 relative">


        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Edit City</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">

            <label className="w-full text-xl sm:w-36 font-medium  p-3" >City:</label>
            <input
              type="text"
              value={city} onChange={(e) => setCity(e.target.value)}

              placeholder="Enter city name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
            >
              Submit
            </button>


            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCityPopup;