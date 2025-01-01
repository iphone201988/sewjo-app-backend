import CommentReply from "../models/commentReply.model.js";
import Comment from "../models/comment.model.js";
import CirclePost from "../models/circlePost.model.js";

// Create a new reply to a comment
export const createCommentReply = async (req, res) => {
  try {
    const { commentId, user, content } = req.body;

    const newReply = await CommentReply.create({
      parentComment: commentId,
      author: user,
      content,
    });

    // Find the post ID from the parent comment and increment the commentCount in CirclePost
    const comment = await Comment.findById(commentId);
    if (comment) {
      await CirclePost.findByIdAndUpdate(comment.post, { $inc: { commentCount: 1 } });
    }

    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a reply
export const updateCommentReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { user, content } = req.body;

    const reply = await CommentReply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    if (reply.author.toString() !== user) {
      return res.status(403).json({ message: "Not authorized to update this reply" });
    }

    reply.content = content;
    await reply.save();

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a reply
export const deleteCommentReply = async (req, res) => {
  try {
    const { replyId, userId } = req.params;

    const reply = await CommentReply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    if (reply.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this reply" });
    }

    // Delete the reply
    await CommentReply.findByIdAndDelete(replyId);

    // Find the parent comment to get the post ID, then decrement commentCount in CirclePost
    const comment = await Comment.findById(reply.parentComment);
    if (comment) {
      await CirclePost.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });
    }

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all replies for a specific comment
export const getRepliesByComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const replies = await CommentReply.find({ parentComment: commentId }).populate("author");

    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const likeCommentReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { userId } = req.body;

    const reply = await CommentReply.findById(replyId);

    if (!reply.likedBy.includes(userId)) {
      reply.likedBy.push(userId);
      reply.likes += 1;
      await reply.save();
      return res.status(200).json(reply);
    } else {
      return res.status(400).json({ message: "User already liked this reply" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unlikeCommentReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { userId } = req.body;

    const reply = await CommentReply.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    if (!reply.likedBy.includes(userId)) {
      return res.status(400).json({ message: "User has not liked this reply" });
    }

    // Remove userId from likedBy array and decrement likes
    reply.likedBy = reply.likedBy.filter((id) => id != userId);
    reply.likes -= 1;
    await reply.save();

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
