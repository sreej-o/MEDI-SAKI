import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    slots: {
      type: Map,
      of: [String],
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Availability", availabilitySchema);
