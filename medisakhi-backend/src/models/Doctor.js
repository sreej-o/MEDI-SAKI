import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    email: String,
    specialization: String,
    hospital: String,
    experience: String,
    fee: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
