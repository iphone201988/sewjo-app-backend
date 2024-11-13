import express from "express";
import {
  cr̥eateCustomizeFields,
  getCustomizeFields,
  updateCustomizeFields,
} from "../controllers/fabricfields.controller.js";

const router = express.Router();

router.post("/add", cr̥eateCustomizeFields);
router.get("/get", getCustomizeFields);
router.put("/update", updateCustomizeFields);

export default router;
