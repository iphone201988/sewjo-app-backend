import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    imageUrl: { 
      type: String, 
      default: null 
    },
    sent_at: {
      type: Date,
      default: Date.now,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true, // Helps link each message to its conversation
    },
  },
  { timestamps: true }
);

// Custom validation to ensure either content or imageUrl is present
messageSchema.pre("validate", function (next) {
  if (!this.content && !this.imageUrl) {
    return next(new Error("Message must contain either content or an image."));
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
