import express from "express";
import {
  createReminder,
  getReminders,
  deleteReminder,
} from "../controllers/reminder.controller.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReminder);
router.get("/", protect, getReminders);
router.delete("/:id", protect, deleteReminder);

export default router;
