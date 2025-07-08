import express from "express";
import { saveEntry } from "../controllers/saveEntry";

const router = express.Router();

router.post("/save-entry", saveEntry);
console.log("✅ entriesRouter loaded");


export default router;
