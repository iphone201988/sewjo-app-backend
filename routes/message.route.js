import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import validate from "../middlewares/validate.js";
import { getMessagesSchema, sendMessageSchema } from "../schema/message.schema.js";


const router = express.Router();

// Get all messages for a specific conversation
router.get("/:conversationId",validate(getMessagesSchema), verifyToken, getMessages);

// Send a new message (the body should include conversation_id, sender_id, receiver_id, and content)
router.post("/",validate(sendMessageSchema), verifyToken, sendMessage);

export default router;
