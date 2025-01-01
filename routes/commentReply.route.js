import express from "express";
import {
  createCommentReply,
  updateCommentReply,
  deleteCommentReply,
  getRepliesByComment,
  likeCommentReply,
  unlikeCommentReply
} from "../controllers/commentReply.controller.js";
import validate from "../middlewares/validate.js";
import { createCommentReplySchema, deleteCommentReplySchema, getRepliesByCommentSchema, likeCommentReplySchema, unlikeCommentReplySchema, updateCommentReplySchema } from "../schema/commentReply.schema.js";

const router = express.Router();

// Create a new reply to a comment
router.post("/",validate(createCommentReplySchema), createCommentReply);

// Update a specific reply
router.put("/:replyId",validate(updateCommentReplySchema), updateCommentReply);

// Delete a specific reply
router.delete("/:replyId/:userId",validate(deleteCommentReplySchema), deleteCommentReply);

// Get all replies for a specific comment
router.get("/comment/:commentId",validate(getRepliesByCommentSchema), getRepliesByComment);

router.post("/replies/:replyId/like",validate(likeCommentReplySchema), likeCommentReply);

router.post("/replies/:replyId/unlike",validate(unlikeCommentReplySchema), unlikeCommentReply);


export default router;
