import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Medicine from "./src/models/Medicine.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for seeding"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const medicines = [];

fs.createReadStream("medicine_data.csv") // make sure filename matches EXACTLY
  .pipe(csv())
  .on("data", (row) => {
    // IMPORTANT FIX ↓↓↓
    if (row.name && row.Is_discontinued === "FALSE") {
      medicines.push({
        name: row.name.trim(),
        manufacturer: row.manufacturer_name || "Not available",
        composition1: row.short_composition1 || "Not specified",
        composition2: row.short_composition2 || "Not specified",
        packSize: row.pack_size_label || "N/A",
        price: row["price(₹)"] || "N/A",
        type: row.type || "Allopathy",

        // Safe defaults
        use: "Ask MediGPT for usage and consult doctor in platform",
        dosage: "As directed by physician",
        sideEffects: "No common side effects reported.",
        precautions: "Consult a doctor before use.",
        image: "",
      });
    }
  })
  .on("end", async () => {
    try {
      await Medicine.deleteMany();
      await Medicine.insertMany(medicines.slice(0, 200000)); // safe limit
      console.log(`✅ Seeded ${medicines.length} medicines`);
      process.exit();
    } catch (err) {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
    }
  });
