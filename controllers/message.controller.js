import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { errorHandler } from "../utils/error.js";
import { io } from "../index.js";

// Get all messages for a specific conversation
export const getMessages = async (req, res, next) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({
      conversation_id: conversationId,
    }).sort("sent_at");

    res.status(200).json(messages);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch messages"));
  }
};

// Send a new message and update conversation
export const sendMessage = async (req, res, next) => {
  const { sender_id, receiver_id, conversation_id, content } = req.body;

  try {
    // Find or create the conversation
    let conversation = conversation_id
      ? await Conversation.findById(conversation_id)
      : await Conversation.findOne({
          participants: { $all: [sender_id, receiver_id] },
        });

    if (!conversation) {
      conversation = new Conversation({
        participants: [sender_id, receiver_id],
      });
      await conversation.save();
    }

    // Create a new message
    const newMessage = new Message({
      sender_id,
      receiver_id,
      conversation_id: conversation._id,
      content,
    });
    await newMessage.save();

    // Update conversation's last message and unread count
    conversation.lastMessage = newMessage._id;
    conversation.unreadCount.set(
      receiver_id,
      (conversation.unreadCount.get(receiver_id) || 0) + 1
    );
    await conversation.save();

    // Emit the new message to all clients (including sender)
    io.emit("receiveMessage", newMessage);

    // Return status but don't send the message again in the response
    res.status(201).json({ success: true });
  } catch (error) {
    next(errorHandler(500, "Failed to send message"));
  }
};
