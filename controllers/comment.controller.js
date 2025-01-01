import Comment from "../models/comment.model.js";
import CommentReply from "../models/commentReply.model.js";
import CirclePost from "../models/circlePost.model.js";

export const createComment = async (req, res) => {
  try {
    const { postId, user, content } = req.body;
    const newComment = await Comment.create({
      post: postId,
      author: user,
      content,
    });
    await CirclePost.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { user, content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== user) {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId, userId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // Decrement commentCount in the related CirclePost
    await CirclePost.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a specific post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch comments and populate their replies and authors
    const comments = await Comment.find({ post: postId })
      .populate("author")
      .lean();

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await CommentReply.find({ parentComment: comment._id }).populate("author");
        return { ...comment, replies }; // Attach replies to each comment
      })
    );

    res.status(200).json(commentsWithReplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Like a comment
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment.likedBy.includes(userId)) {
      comment.likedBy.push(userId);
      comment.likes += 1;
      await comment.save();
      return res.status(200).json(comment);
    } else {
      return res.status(400).json({ message: "User already liked this comment" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;
    

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.likedBy.includes(userId)) {
      return res.status(400).json({ message: "User has not liked this comment" });
    }

    // Remove userId from likedBy array and decrement likes
    comment.likedBy = comment.likedBy.filter((id) => id != userId);
    comment.likes -= 1;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

