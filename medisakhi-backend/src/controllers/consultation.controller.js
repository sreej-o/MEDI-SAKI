import Consultation from "../models/Consultation.js";
export const createConsultation = async (req, res) => {
  try {
    const { doctorId, day, time } = req.body;

    const consultation = await Consultation.create({
      doctor: doctorId,
      patient: req.user.id,
      day,
      time,
      status: "pending",
    });

    res.status(201).json({
      message: "Proceed to payment",
      consultationId: consultation._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};
export const markPaid = async (req, res) => {
  const consultation = await Consultation.findById(req.params.id);

  consultation.status = "paid";
  await consultation.save();

  res.json({ message: "Payment successful" });
};


export const bookConsultation = async (req, res) => {
  try {
    const { doctorId, day, time } = req.body;

    if (!doctorId || !day || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const consultation = await Consultation.create({
      doctor: doctorId,       // Doctor PROFILE id
      patient: req.user.id,   // Patient USER id
      day,
      time,
    });

    res.status(201).json({
      message: "Consultation booked successfully",
      consultation,
    });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};
