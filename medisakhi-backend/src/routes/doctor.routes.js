import express from "express";
import Doctor from "../models/Doctor.js";
import {
  getDoctors,
  getDoctorById,
} from "../controllers/doctor.controller.js";





const router = express.Router();

// GET ALL DOCTORS
router.get("/", getDoctors);

// GET SINGLE DOCTOR
router.get("/:id", getDoctorById);



/**
 * ADD / UPDATE availability
 */
router.post("/availability/:doctorId", async (req, res) => {
  const { availability } = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.doctorId,
      { availability },
      { new: true }
    );

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Failed to update availability" });
  }
});

/**
 * GET availability
 */
router.get("/availability/:doctorId", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    res.json(doctor.availability);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch availability" });
  }
});

export default router;
