import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    manufacturer: { type: String, default: "Not available" },

    composition1: { type: String, default: "Not specified" },
    
    composition2: { type: String, default: "Not specified" },

    packSize: { type: String, default: "N/A" },

    price: { type: String, default: "N/A" },

    type: { type: String, default: "Allopathy" },

    // Medical guidance (kept generic & safe)
    use: { type: String, default: "Consult doctor for usage" },
    dosage: { type: String, default: "As directed by physician" },
    sideEffects: {
      type: String,
      default: "No common side effects reported.",
    },
    precautions: {
      type: String,
      default: "Consult a doctor before use.",
    },

    image: { type: String, default: "medicine.jpg" },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
