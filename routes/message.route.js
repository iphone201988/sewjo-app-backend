import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get all messages for a specific conversation
router.get("/:conversationId", verifyToken, getMessages);

// Send a new message (the body should include conversation_id, sender_id, receiver_id, and content)
router.post("/", verifyToken, sendMessage);

export default router;
