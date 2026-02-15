import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Consult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/doctors/${id}`)
      .then(res => setDoctor(res.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!doctor?.user) return;
    axios.get(`http://localhost:5000/api/availability/${doctor.user}`)
      .then(res => setSlots(res.data.slots || {}))
      .catch(console.error);
  }, [doctor]);

  const handleBooking = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/consultations",
      {
        doctorId: doctor._id,
        day: selectedDay,
        time: selectedTime,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate(`/payment/${res.data.consultation._id}`);
  };

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

        <h2 className="text-lg font-semibold mb-4">
          Book with Dr. {doctor.name}
        </h2>

        {/* DAY */}
        <label className="text-sm font-medium">Select Day</label>
        <select
          value={selectedDay}
          onChange={(e) => {
            setSelectedDay(e.target.value);
            setSelectedTime("");
          }}
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
        >
          <option value="">Choose day</option>
          {Object.keys(slots).map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        {/* TIME */}
        {selectedDay && (
          <>
            <label className="text-sm font-medium">Select Time</label>
            <div className="grid grid-cols-3 gap-2 mt-2 mb-5">
              {slots[selectedDay].map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`border rounded-lg py-2 text-sm ${
                    selectedTime === time
                      ? "bg-teal-600 text-white"
                      : "hover:bg-teal-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          disabled={!selectedDay || !selectedTime}
          onClick={handleBooking}
          className="w-full bg-teal-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Consult;