import express from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
  likeComment,
  unlikeComment
} from "../controllers/comment.controller.js";
import validate from "../middlewares/validate.js";
import { createCommentSchema, deleteCommentSchema, getCommentsByPostSchema, likeCommentSchema, unlikeCommentSchema, updateCommentSchema } from "../schema/comment.schema.js";

const router = express.Router();

// Create a new comment on a post
router.post("/",validate(createCommentSchema), createComment);

// Update a specific comment
router.put("/:commentId",validate(updateCommentSchema), updateComment);

//Increase like
router.post("/:commentId/like",validate(likeCommentSchema), likeComment);

// Delete a specific comment
router.delete("/:commentId/:userId",validate(deleteCommentSchema), deleteComment);

// Get all comments for a specific post
router.get("/post/:postId",validate(getCommentsByPostSchema), getCommentsByPost);

router.post("/:commentId/unlike",validate(unlikeCommentSchema), unlikeComment);


export default router;
