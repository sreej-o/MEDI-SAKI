import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// fallback image logic
const getMedicineImage = (type) => {
  if (!type)
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae";
  return "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1179&auto=format&fit=crop";
};

function MedicineDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ FIX
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/medicines/${id}`)
      .then((res) => {
        setMedicine(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-6 text-slate-500">Loading medicine details...</p>;
  }

  if (!medicine) {
    return <p className="p-6 text-red-500">Medicine not found</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        {/* IMAGE */}
        <img
          src={medicine.image || getMedicineImage(medicine.type)}
          alt={medicine.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold text-slate-800">
          {medicine.name}
        </h1>

        <p className="text-slate-600 mt-1">
          Manufactured by <span className="font-medium">{medicine.manufacturer}</span>
        </p>

        {/* PRICE & PACK */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-100 rounded-lg">
            <p className="text-sm text-slate-500">Price</p>
            <p className="text-lg font-semibold">₹{medicine.price || "N/A"}</p>
          </div>

          <div className="p-4 bg-slate-100 rounded-lg">
            <p className="text-sm text-slate-500">Pack Size</p>
            <p className="text-lg font-semibold">{medicine.packSize || "N/A"}</p>
          </div>
        </div>

        {/* USE */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Uses</h3>
          <p className="text-slate-700">{medicine.use}</p>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() =>
              navigate("/chat", {
                state: { medicineId: medicine._id },
              })
            }
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Ask AI about this medicine
          </button>

          <button
            onClick={() => navigate("/prices/Paracetamol", { state: { medicine } })}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Compare Prices
          </button>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
             Educational purpose only. Consult a doctor before use.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MedicineDetails;
