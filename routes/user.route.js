import express from "express";
import { getFabricList, updateHistory, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import validate from "../middlewares/validate.js";
import { updateProfileSchema } from "../schema/user.schema.js";


const router = express.Router();

router.put("/update",validate(updateProfileSchema), verifyToken, updateUser);
router.get("/fabriclist", verifyToken, getFabricList);
router.put("/update-history/:id",verifyToken, updateHistory);

export default router;
