import express from "express";
import { sendMessage, getChats, getSingleChat } from "../controllers/chat.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/", protect, getChats);
router.get("/:id", protect, getSingleChat);

export default router;
