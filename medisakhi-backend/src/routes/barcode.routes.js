import express from "express";
import { lookupBarcode } from "../controllers/barcode.controller.js";

const router = express.Router();

router.post("/lookup", lookupBarcode);

export default router;
