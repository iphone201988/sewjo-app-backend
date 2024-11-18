import express from "express";
import {
  googleLogin,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  signinSchema,
  signupSchema,
  socialLoginSchema,
} from "../schema/user.schema.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);
router.post("/google", validate(socialLoginSchema), googleLogin);
router.put("/signout", verifyToken, signout);

export default router;
