import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between">
      
      {/* TOP */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-teal-100 flex items-center justify-center text-xl font-bold text-teal-600">
          {doctor.name.charAt(0)}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-teal-600">{doctor.specialization || "General Physician"}</p>

          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span>⭐ 4.7</span>
            <span>• {doctor.experience || 8} yrs</span>
            <span>• {doctor.location || "India"}</span>
          </div>
        </div>

        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
          Available
        </span>
      </div>

      {/* LANGUAGES */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {(doctor.languages || ["English", "Hindi"]).map((lang, i) => (
          <span
            key={i}
            className="text-xs border px-3 py-1 rounded-full"
          >
            {lang}
          </span>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-lg font-semibold">
          ₹{doctor.fee || 300}
          <span className="text-sm text-gray-500"> / session</span>
        </p>

        <button
          onClick={() => navigate(`/consult/${doctor._id}`)}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;