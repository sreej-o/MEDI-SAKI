import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bot, Bell, User, LogOut } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
            MS
          </div>
          <span className="text-xl font-bold text-slate-900">
            MediSakhi
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">

          <Link className="hover:text-teal-600" to="/">Home</Link>
          <Link className="hover:text-teal-600" to="/search">Medicines</Link>

          <Link className="hover:text-teal-600 flex items-center gap-1" to="/chat">
            <Bot size={16} /> AI Assistant
          </Link>

          <Link className="hover:text-teal-600 flex items-center gap-1" to="/reminders">
            <Bell size={16} /> Reminders
          </Link>

          {/* ROLE BASED */}
          {user?.role === "patient" && (
            <Link className="hover:text-teal-600" to="/doctors">
              Consult Doctors
            </Link>
          )}

          {user?.role === "doctor" && (
            <Link className="hover:text-teal-600" to="/doctor/dashboard">
              Doctor Dashboard
            </Link>
          )}

          {user?.role === "patient" && (
            <Link className="hover:text-teal-600" to="/patient/dashboard">
              My Dashboard
            </Link>
          )}
        </div>

        {/* AUTH ACTIONS */}
        <div className="flex items-center gap-4 text-sm">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-slate-700 hover:text-teal-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-slate-600">
                <User size={16} />
                <span className="capitalize">{user.role}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
const FeatureCard = ({ icon, title, desc, link }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
    <p className="text-slate-600 mt-2 text-sm">{desc}</p>
    <Link
      to={link}
      className="inline-block mt-4 text-teal-600 font-medium hover:underline"
    >
      Learn more →
    </Link>
  </div>
);

export default Navbar;
