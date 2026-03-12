import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

function Reminders() {
  // ✅ hooks MUST be inside component
  const { token } = useAuth();

  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  // 🔊 audio
  const audioRef = useRef(new Audio("/reminder.mp3"));
  const playedRef = useRef({});

  // 🔔 notification permission (ONCE)
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // 📥 fetch reminders
  const fetchReminders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reminder`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders(res.data);
    } catch (err) {
      console.error("Fetch reminders failed", err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // ⏰ check time + play audio
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      reminders.forEach((r) => {
        if (r.time === currentTime && !playedRef.current[r._id]) {
          audioRef.current.play();

          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("💊 Medicine Reminder", {
              body: `Time to take ${r.medicineName}`,
            });
          }

          playedRef.current[r._id] = true;
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [reminders]);

  // ➕ add reminder
  const addReminder = async () => {
    if (!medicineName || !time) {
      setMessage("Medicine name & time required");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/reminder`,
        { medicineName, dosage, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMedicineName("");
      setDosage("");
      setTime("");

      // ✅ set message ONLY after success
      setMessage("✅ Reminder added (Email notification enabled)");
      fetchReminders();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to add reminder");
    }
  };

  // ❌ delete reminder
  const deleteReminder = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/reminder/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReminders();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Medicine Reminders</h2>

        {message && (
          <p className="mb-3 text-sm text-green-600">{message}</p>
        )}

        {/* ADD */}
        <div className="space-y-3 mb-6">
          <input
            placeholder="Medicine name"
            className="w-full border p-2 rounded"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />

          <input
            placeholder="Dosage (optional)"
            className="w-full border p-2 rounded"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />

          <input
            type="time"
            className="w-full border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            onClick={addReminder}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Add Reminder
          </button>
        </div>

        {/* LIST */}
        {reminders.length === 0 ? (
          <p className="text-slate-500">No reminders yet</p>
        ) : (
          <ul className="space-y-3">
            {reminders.map((r) => (
              <li
                key={r._id}
                className="flex justify-between items-center bg-slate-100 p-3 rounded"
              >
                <div>
                  <p className="font-semibold">{r.medicineName}</p>
                  <p className="text-sm text-slate-600">
                    {r.dosage || "—"} • ⏰ {r.time}
                  </p>
                </div>
                <button
                  onClick={() => deleteReminder(r._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reminders;
