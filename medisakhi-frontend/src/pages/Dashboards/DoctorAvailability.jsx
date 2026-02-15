import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function formatToAMPM(time24) {
  const [h, m] = time24.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

function DoctorAvailability() {
  const { token } = useAuth();
  const [slots, setSlots] = useState({});
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");

  // ✅ LOAD AVAILABILITY
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/availability", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSlots(res.data.slots || {}))
      .catch(console.error);
  }, [token]);

  const addSlot = (day) => {
    if (!inputs[day]) return;

    const formatted = formatToAMPM(inputs[day]);

    setSlots((prev) => ({
      ...prev,
      [day]: prev[day]
        ? [...new Set([...prev[day], formatted])]
        : [formatted],
    }));

    setInputs((prev) => ({ ...prev, [day]: "" }));
  };

  const saveAvailability = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/availability",
        { slots },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSlots(res.data.slots);
      setMessage("✅ Availability saved");
    } catch {
      setMessage("❌ Failed to save");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Availability</h2>

      {message && (
        <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      {days.map((day) => (
        <div key={day} className="mb-5">
          <strong>{day}</strong>

          <div className="flex gap-2 flex-wrap mt-2">
            {slots[day]?.map((time, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                ⏰ {time}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="time"
              value={inputs[day] || ""}
              onChange={(e) =>
                setInputs({ ...inputs, [day]: e.target.value })
              }
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={() => addSlot(day)}
              className="text-blue-600 text-sm"
            >
              + Add Slot
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={saveAvailability}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Availability
      </button>
    </div>
  );
}

export default DoctorAvailability;
