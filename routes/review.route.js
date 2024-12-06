import express from "express";
import {
  addRating,
  deleteRating,
  getRatings,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  addRatingSchema,
  deleteRatingSchema,
  getRatingSchema,
} from "../schema/review.schema.js";
import validate from "../middlewares/validate.js";
const router = express.Router();

router.post("/add", validate(addRatingSchema), verifyToken, addRating);

router.delete(
  "/delete/:id",
  validate(deleteRatingSchema),
  verifyToken,
  deleteRating
);

router.get("/get/:id", validate(getRatingSchema), verifyToken, getRatings);

export default router;
