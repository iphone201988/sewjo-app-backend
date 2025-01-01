import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { errorHandler } from "../utils/error.js";
import { io } from "../index.js";

// Get all messages for a specific conversation
export const getMessages = async (req, res, next) => {
  const { conversationId } = req.params;
  const { page = 1, limit = 20 } = req.query;  // Default values for page and limit

  try {
    // Count the total number of messages (optional, but useful for pagination UI)
    const totalMessages = await Message.countDocuments({
      conversation_id: conversationId,
    });

    // Fetch messages, sorted by sent_at in descending order (newest first)
    const messages = await Message.find({
      conversation_id: conversationId,
    })
      .sort({ sent_at: -1 })  // Sort newest to oldest
      .skip((page - 1) * limit)  // Skip the messages for previous pages
      .limit(parseInt(limit));  // Limit to the number of messages per page

    res.status(200).json({
      messages,
      totalMessages,
      currentPage: parseInt(page),
      hasNextPage: page * limit < totalMessages,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch messages"));
  }
};

// Send a new message and update the conversation
export const sendMessage = async (req, res, next) => {
  const { sender_id, receiver_id, conversation_id, content, imageUrl } = req.body;

  try {
    let conversation = conversation_id
      ? await Conversation.findById(conversation_id)
      : await Conversation.findOne({ participants: { $all: [sender_id, receiver_id] } });

    if (!conversation) {
      conversation = new Conversation({ participants: [sender_id, receiver_id] });
      await conversation.save();
    }

    // Remove sender and receiver from hiddenFor array to make the conversation visible
    conversation.hiddenFor = conversation.hiddenFor.filter(
      (userId) => ![sender_id, receiver_id].includes(userId.toString())
    );
    await conversation.save();

    const newMessage = new Message({
      sender_id,
      receiver_id,
      conversation_id: conversation._id,
      content,
      imageUrl: imageUrl || null,
    });
    await newMessage.save();

    conversation.lastMessage = newMessage._id;
    conversation.unreadCount.set(receiver_id, (conversation.unreadCount.get(receiver_id) || 0) + 1);
    await conversation.save();

    io.emit("receiveMessage", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    next(errorHandler(500, "Failed to send message"));
  }
};

