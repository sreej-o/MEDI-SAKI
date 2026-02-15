import express from "express";
import { bookConsultation, markPaid } from "../controllers/consultation.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookConsultation);
router.put("/:id/pay", protect, markPaid);

export default router;
