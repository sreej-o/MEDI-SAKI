import User from "../models/User.js";
import Doctor from "../models/Doctor.js";

/**
 * GET ALL DOCTORS
 * Shows all users with role = doctor
 * If doctor profile exists → include it
 */


/* ================= GET SINGLE DOCTOR ================= */


export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user");

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found. Please contact admin.",
      });
    }

    res.json({
      _id: doctor._id,
      user: doctor.user._id,
      name: doctor.name,
      email: doctor.email,
      specialization: doctor.specialization || "General",
      hospital: doctor.hospital || "Not specified",
      fee: doctor.fee || 300,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch doctor" });
  }
};


export const getDoctors = async (req, res) => {
  try {
    // 1. Get all users who are doctors
    const users = await User.find({ role: "doctor" }).select("-password");

    // 2. Get doctor profiles
    const doctorProfiles = await Doctor.find();

    // 3. Merge user + doctor profile
    const doctors = users.map((user) => {
      const profile = doctorProfiles.find(
        (doc) => doc.user.toString() === user._id.toString()
      );

      return {
        _id: profile?._id || user._id,
        userId: user._id,
        name: profile?.name || user.name,
        email: profile?.email || user.email,
        specialization: profile?.specialization || "General",
        hospital: profile?.hospital || "Not specified",
        fee: profile?.fee || 300,
      };
    });

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};
