import Availability from "../models/Availability.js";

/**
 * ===============================
 * PATIENT SIDE
 * GET availability by doctorId
 * ===============================
 * GET /api/availability/:doctorId
 * 
 */




export const getAvailabilityByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const availability = await Availability.findOne({
      doctor: doctorId, // ✅ Doctor._id
    });

    if (!availability) {
      return res.json({ slots: {} });
    }

    res.json({
      slots: Object.fromEntries(availability.slots),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch availability" });
  }
};




/**
 * ===============================
 * DOCTOR SIDE
 * Load own availability
 * ===============================
 * GET /api/availability
 */
export const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOne({
      doctor: req.user.id,
    });

    res.status(200).json({
      slots: availability ? Object.fromEntries(availability.slots) : {},
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load availability" });
  }
};

/**
 * ===============================
 * DOCTOR SIDE
 * Save availability
 * ===============================
 * POST /api/availability
 */
export const saveAvailability = async (req, res) => {
  try {
    const { slots } = req.body;

    let availability = await Availability.findOne({
      doctor: req.user.id,
    });

    if (!availability) {
      availability = new Availability({
        doctor: req.user.id,
        slots: new Map(),
      });
    }

    // ✅ MERGE slots correctly
    for (const [day, times] of Object.entries(slots)) {
      const existing = availability.slots.get(day) || [];
      const merged = Array.from(new Set([...existing, ...times]));
      availability.slots.set(day, merged);
    }

    availability.markModified("slots");
    await availability.save();

    res.status(200).json({
      message: "Availability saved",
      slots: Object.fromEntries(availability.slots),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Save failed" });
  }
};
