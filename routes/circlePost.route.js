import express from "express";
import {
  createCirclePost,
  updateCirclePost,
  deleteCirclePost,
  getPostsByCircle,
  getPostsByUser,
  getPostWithCommentsAndReplies,
  likePost,
  unlikePost,
} from "../controllers/circlePost.controller.js";
import { createCirclePostSchema, deleteCirclePostSchema, getPostsByCircleSchema, getPostsByUserSchema, getPostWithCommentsAndRepliesSchema, likePostSchema, unlikePostSchema, updateCirclePostSchema } from "../schema/circlePost.schema.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

// Create a new post in a circle
router.post("/",validate(createCirclePostSchema), createCirclePost);

// Update a specific post (only the author can update)
router.put("/:postId",validate(updateCirclePostSchema), updateCirclePost);

// Delete a specific post (only the author can delete)
router.delete("/:postId/:userId",validate(deleteCirclePostSchema), deleteCirclePost);

// Get all posts in a specific circle with optional theme filter and pagination
router.get("/circle/:circleId",validate(getPostsByCircleSchema), getPostsByCircle);

// Get all posts by a specific user with pagination
router.get("/user/:userId",validate(getPostsByUserSchema), getPostsByUser);

// Get a single post with its comments and replies (for detailed view)
router.get("/:postId/details",validate(getPostWithCommentsAndRepliesSchema), getPostWithCommentsAndReplies);

// Like a post
router.post("/:postId/like",validate(likePostSchema), likePost);

// Unlike a post
router.post("/:postId/unlike",validate(unlikePostSchema), unlikePost);

export default router;
