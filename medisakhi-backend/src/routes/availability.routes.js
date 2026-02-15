import express from "express";
import {
  getAvailabilityByDoctor,
  getAvailability,
  saveAvailability,
} from "../controllers/availability.controller.js";

import { protect } from "../middleware/authMiddleware.js"; // ✅ FIX

const router = express.Router();

// PATIENT
router.get("/:doctorId", getAvailabilityByDoctor);

// DOCTOR
router.get("/", protect, getAvailability);
router.post("/", protect, saveAvailability);

export default router;
