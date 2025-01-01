import express from 'express';
import {
  createConversation,
  getConversations,
  getConversationMessages,
  markMessagesAsRead,
  getConversationId,
  hideConversation,
} from '../controllers/conversation.controller.js';
import validate from '../middlewares/validate.js';
import { createConversationSchema, getConversationIdSchema, getConversationMessagesSchema, getConversationsSchema, hideConversationSchema, markMessagesAsReadSchema } from '../schema/conversation.schema.js';

const router = express.Router();

// Fetch all conversations for a user
router.get('/:userId',validate(getConversationsSchema), getConversations);

// Create a new conversation
router.post('/',validate(createConversationSchema), createConversation);

// Get or create a conversation ID based on sender and receiver
router.post('/getOrCreate',validate(getConversationIdSchema), getConversationId);

// Fetch messages in a specific conversation
router.get('/:conversationId/messages',validate(getConversationMessagesSchema), getConversationMessages);

// Mark all messages as read in a conversation for a user
router.put('/:conversationId/read',validate(markMessagesAsReadSchema), markMessagesAsRead);

// Hide a conversation for a user
router.post('/hide',validate(hideConversationSchema), hideConversation); // New route

export default router;
