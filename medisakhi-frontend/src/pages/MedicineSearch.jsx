import { useEffect, useState } from "react";
import axios from "axios";
import MedicineCard from "../components/MedicineCard";

function MedicineSearch() {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchMedicines = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/medicines",
          {
            params:
              search.trim().length >= 2
                ? { search: search.trim() }
                : {},
          }
        );

        setMedicines(res.data);
      } catch (error) {
        console.error("Error fetching medicines", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          Search Medicines
          <i className="fa-solid fa-magnifying-glass text-teal-600"></i>
        </h2>

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* CONTENT */}
        {loading ? (
          <p className="text-slate-500">Loading medicines...</p>
        ) : medicines.length === 0 ? (
          <p className="text-slate-500">
            No medicines found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {medicines.map((medicine) => (
              <MedicineCard
                key={medicine._id}
                medicine={medicine}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MedicineSearch;
