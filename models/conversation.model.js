import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    unreadCount: {
      type: Map,
      of: Number, // Tracks unread messages for each user
      default: {}
    },
    hiddenFor: { // Array to track users who have hidden this conversation
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
