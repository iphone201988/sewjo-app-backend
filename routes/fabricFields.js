import express from "express";
import {
  cr̥eateCustomizeFields,
  getCustomizeFields,
  updateCustomizeFields,
} from "../controllers/fabricfields.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/add", verifyToken, cr̥eateCustomizeFields);
router.get("/get",verifyToken, getCustomizeFields);
router.put("/update",verifyToken, updateCustomizeFields);


export default router;
