import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DoctorAvailability from "./DoctorAvailability";

function DoctorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else if (user.role !== "doctor") navigate("/patient/dashboard");
  }, [user, navigate]);

  if (!user || user.role !== "doctor") return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <DoctorAvailability />
      </div>
    </div>
  );
}

export default DoctorDashboard;
