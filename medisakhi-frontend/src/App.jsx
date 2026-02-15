import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import MedicineSearch from "./pages/MedicineSearch.jsx";
import MedicineDetails from "./pages/MedicineDetails.jsx";
import Consult from "./pages/Consult.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import Reminders from "./pages/Reminders.jsx";
import BarcodeScanner from "./pages/BarcodeScanner.jsx";
import PriceComparison from "./pages/PriceComparison.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";
import Doctors from "./pages/Doctors.jsx";
import Payment from "./pages/Payment.jsx";
import Waiting from "./pages/Waiting.jsx";
import PrescriptionUpload from "./pages/Prescription.jsx";

import DoctorDashboard from "./pages/Dashboards/DoctorDashboard.jsx";
import PatientDashboard from "./pages/Dashboards/PatientDashboard.jsx";

import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";

import Navbar from "./components/Navbar.jsx";
import AppLayout from "./components/AppLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/prices/:medicineName" element={<PriceComparison />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/waiting/:id" element={<Waiting />} />

        {/* Medicine */}
        <Route
          path="/search"
          element={
            <AppLayout>
              <MedicineSearch />
            </AppLayout>
          }
        />
        <Route path="/medicine/:id" element={<MedicineDetails />} />

        {/* Patient (Protected) */}
        <Route
          path="/consult"
          element={
            <ProtectedRoute role="patient">
              <Consult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prescription"
          element={
            <ProtectedRoute role="patient">
              <PrescriptionUpload />
            </ProtectedRoute>
          }
        />

        {/* Doctor (Protected) */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Common Protected */}
        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <Reminders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;