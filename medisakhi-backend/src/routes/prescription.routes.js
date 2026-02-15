import express from "express";
import multer from "multer";
import { analyzePrescription } from "../controllers/prescription.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/analyze",
  upload.single("prescription"),
  analyzePrescription
);

export default router;
