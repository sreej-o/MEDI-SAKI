import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/availability/${id}`)
      .then(res => setAvailability(res.data.slots || {}))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Doctor Availability</h1>

      {Object.keys(availability).length === 0 && (
        <p>No slots available</p>
      )}

      {Object.entries(availability).map(([day, times]) => (
        <div key={day} className="mb-4">
          <h3 className="font-semibold">{day}</h3>

          <div className="flex gap-2 flex-wrap mt-2">
            {times.map((time, i) => (
              <button
                key={i}
                className="bg-green-100 px-3 py-1 rounded"
                onClick={() =>
                  navigate("/consult", {
                    state: { doctorId: id, day, time }
                  })
                }
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorDetails;
