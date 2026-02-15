import express from "express";
import { mediGPT } from "../controllers/ai.controller.js";

const router = express.Router();

// POST http://localhost:5000/api/ai/chat
router.post("/chat", mediGPT);

export default router;
