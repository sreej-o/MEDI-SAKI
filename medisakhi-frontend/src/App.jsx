import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MedicineSearch from "./pages/MedicineSearch.jsx";
import MedicineDetails from "./pages/MedicineDetails.jsx";
import Consult from "./pages/Consult.jsx";
import Navbar from "./components/Navbar.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import Reminders from "./pages/Reminders.jsx";
import BarcodeScanner from "./pages/BarcodeScanner.jsx";
import PriceComparison from "./pages/PriceComparison.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";
import DoctorDashboard from "./pages/Dashboards/DoctorDashboard.jsx";
import PatientDashboard from "./pages/Dashboards/PatientDashboard.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import Doctors from "./pages/Doctors";
import Payment from "./pages/Payment.jsx";
import Waiting from "./pages/Waiting.jsx";
import PrescriptionUpload from "./pages/Prescription.jsx";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<MedicineSearch />} />
        <Route path="/medicine/:id" element={<MedicineDetails />} />
        <Route path="/medicine/:id" element={<MedicineDetails />} />
        <Route path="/chatbot" element={<ChatbotPage />} />

        <Route path="/consult" element={<Consult />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route
          path="/search"
          element={
            <AppLayout>
              <MedicineSearch />
            </AppLayout>
          }
        />

        <Route path="/chat" element={<ChatbotPage />} />
        <Route path="/reminders" element={<Reminders />} />

        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <Reminders />
            </ProtectedRoute>
          }
        />

        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/prices/:medicineName" element={<PriceComparison />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/consult/:id" element={<Consult />} />
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/consult"
          element={
            <ProtectedRoute role="patient">
              <Consult />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />

        <Route
          path="/consult"
          element={
            <ProtectedRoute role="patient">
              <Consult />
            </ProtectedRoute>
          }
        />

        <Route path="/consult/:id" element={<Consult />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/waiting/:id" element={<Waiting />} />
        <Route path="/prescription" element={<PrescriptionUpload />} />
</Routes>

    </BrowserRouter>
       
  );
}

export default App;
