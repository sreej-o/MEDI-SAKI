import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  medicineName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
  },
  time: {
    type: String, // "08:00"
    required: true,
  },
  frequency: {
    type: String, // once / daily
    default: "daily",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Reminder", reminderSchema);
