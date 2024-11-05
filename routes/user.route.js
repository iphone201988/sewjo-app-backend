import express from "express";
import { getFabricList, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = express.Router();

router.post("/:id/update", verifyToken, updateUser);
router.get("/:id/fabriclist", verifyToken, getFabricList);

export default router;
