import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import mongoose from 'mongoose';

// Create a new conversation
export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if a conversation already exists between these users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (conversation) {
      return res.status(400).json({ message: 'Conversation already exists.' });
    }

    // If conversation not exist then create a new conversation
    conversation = new Conversation({
      participants: [senderId, receiverId],
      unreadCount: {
        [senderId]: 0,
        [receiverId]: 0,
      },
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all conversations for a user
export const getConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate('lastMessage')  // Populates the last message details
      .populate('participants', 'displayName profileImage')  // Populates participant info
      .exec();

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages in a conversation
export const getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({
      conversation: mongoose.Types.ObjectId(conversationId),
    }).sort({ sent_at: 1 }); // Sort by date

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark messages as read for a user
export const markMessagesAsRead = async (req, res) => {
  const { conversationId } = req.params;
  const { userId } = req.body;

  try {
    // Find the conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Reset unread count for the user
    conversation.unreadCount.set(userId, 0);
    await conversation.save();

    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new conversation or get existing one
export const getConversationId = async (req, res) => {
    const { sender_id, receiver_id } = req.body;
    

    try {
        // Check if a conversation exists
        let conversation = await Conversation.findOne({
            participants: { $all: [sender_id, receiver_id] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = new Conversation({
                participants: [sender_id, receiver_id],
            });
            await conversation.save();
        }

        // Return the conversationId
        res.status(200).json({ conversationId: conversation._id });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve or create conversation." });
    }
};