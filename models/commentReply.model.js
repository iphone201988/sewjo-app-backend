import mongoose from "mongoose";

const commentReplySchema = new mongoose.Schema(
    {
      parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
        maxLength: 500,
      },
      likes: {
        type: Number,
        default: 0,
      },
      likedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    { timestamps: true }
  );

  commentReplySchema.index({ parentComment: 1 });
  commentReplySchema.index({ author: 1 });
  
  const CommentReply = mongoose.model("CommentReply", commentReplySchema);
  
  export default CommentReply;
  