import { useNavigate } from "react-router-dom";

function MedicineCard({ medicine }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

      <h3 className="text-xl font-semibold text-slate-800">
        {medicine.name}
      </h3>

      <p className="text-slate-600 text-sm mt-2">
        {medicine.manufacturer || "Manufacturer not available"}
        <br />
        <span className="text-xs text-slate-500">📍 India</span>
      </p>

      <p className="mt-3 font-medium text-slate-700">
        Price: ₹{medicine.price || "N/A"}
      </p>

      <div className="mt-4 flex gap-3">
        {/* VIEW DETAILS */}
        <button
          onClick={() => navigate(`/medicine/${medicine._id}`)}
          className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm"
        >
          View Details
        </button>

        {/* ASK MEDIGPT */}
        <button
          onClick={() =>
            navigate("/chat", {
              state: {
                medicineName: medicine.name,
              },
            })
          }
          className="flex-1 border border-teal-600 text-teal-600 py-2 rounded-lg text-sm hover:bg-teal-50"
        >
          Ask MediGPT
        </button>
      </div>
    </div>
  );
}

export default MedicineCard;