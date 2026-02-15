import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

/**
 * GET /api/medicines?search=para
 */
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const medicines = await Medicine.find(query)
      .limit(1020)
      .sort({ name: 1 });

    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

/**
 * GET /api/medicines/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicine details" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search && search.length >= 2) {
      query = { name: { $regex: search, $options: "i" } };
    }

    const medicines = await Medicine.find(query)
      .limit(130)
      .sort({ name: 1 });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
});


export default router;
