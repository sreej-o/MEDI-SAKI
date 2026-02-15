import express from "express";
import { comparePrices } from "../controllers/price.controller.js";

const router = express.Router();

router.get("/compare/:medicine", comparePrices);

export default router;