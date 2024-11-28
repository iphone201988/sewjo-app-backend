import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  createFormOrder,
  getFormOrderById,
  updateFormOrder,
} from "../controllers/formorder.controller.js";

const router = express.Router();

router.post("/add", verifyToken, createFormOrder);
router.get("/get/:form_id", verifyToken, getFormOrderById);
router.put("/update/:form_id", verifyToken, updateFormOrder);

export default router;
