import express from "express";
import {
  addRating,
  deleteRating,
  dislikeUndislike,
  getRatings,
  likeDislike,
  LikeUnlikeReview,
  updateRating,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  addRatingSchema,
  deleteRatingSchema,
  getRatingSchema,
  updateRatingSchema,
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

router.put(
  "/update/:id",
  validate(updateRatingSchema),
  verifyToken,
  updateRating
);

router.put("/like/:id", verifyToken, LikeUnlikeReview);

router.put("/dislike/:id", verifyToken, dislikeUndislike);

router.put("/like-dislike/:id", verifyToken, likeDislike);

export default router;
