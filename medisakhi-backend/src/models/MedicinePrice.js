import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    platform: String,
    price: Number,
    link: String,
  },
  { _id: false }
);

const medicinePriceSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      index: true,
    },
    salt: String,
    prices: [priceSchema],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MedicinePrice", medicinePriceSchema);
