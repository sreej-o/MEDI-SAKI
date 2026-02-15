import express from "express";
import cors from "cors";
import connectDB from "./config.js/db.js";
import medicineRoutes from "./routes/medicine.routes.js";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import consultationRoutes from "./routes/consultation.routes.js";
import priceRoutes from "./routes/price.routes.js";
import barcodeRoutes from "./routes/barcode.routes.js";
import reminderRoutes from "./routes/reminder.routes.js";
import "./utils/reminderCron.js";
import prescriptionRoutes from "./routes/prescription.routes.js";








dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());



app.use("/api/medicines", medicineRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/barcode", barcodeRoutes);
app.use("/api/reminder",reminderRoutes);
app.use("/api/prescription", prescriptionRoutes);




app.listen(5000, () => {
  console.log("🚀 MediSakhi backend running on port 5000");
});
