import CirclePost from "../models/circlePost.model.js";
import Comment from "../models/comment.model.js";
import CommentReply from "../models/commentReply.model.js";

export const createCirclePost = async (req, res) => {
  try {
    const {
      user,
      circle,
      content,
      theme,
      linkedItems,
      videoUrl,
      images,
      title,
    } = req.body;
    const newPost = await CirclePost.create({
      user,
      circle,
      content,
      theme,
      linkedItems,
      videoUrl,
      images,
      title,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCirclePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { user, content, theme, linkedItems, videoUrl, images, title } =
      req.body;
    const post = await CirclePost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== user) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post." });
    }
    post.content = content || post.content;
    post.theme = theme || post.theme;
    post.linkedItems = linkedItems || post.linkedItems;
    post.videoUrl = videoUrl || post.videoUrl;
    post.images = images || post.images;
    post.title = title || post.title;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCirclePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await CirclePost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post." });
    }
    await CirclePost.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByCircle = async (req, res) => {
  try {
    const { circleId } = req.params;
    const { theme, page = 1, limit = 10 } = req.query;

    const filter = { circle: circleId };
    if (theme) filter.theme = theme;

    const posts = await CirclePost.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const posts = await CirclePost.find({ user: userId })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("circle")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostWithCommentsAndReplies = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await CirclePost.findById(postId).populate("user");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = await Comment.find({ post: postId })
      .populate("author")
      .lean();
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await CommentReply.find({ parentComment: comment._id })
          .populate("author")
          .lean();

        return {
          ...comment,
          replies,
        };
      })
    );
    const postWithCommentsAndReplies = {
      ...post.toObject(),
      comments: commentsWithReplies,
    };
    res.status(200).json(postWithCommentsAndReplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await CirclePost.findById(postId);
    if (!post.likedBy.includes(userId)) {
      post.likedBy.push(userId);
      post.likes += 1;
      await post.save();
      return res.status(200).json(post);
    } else {
      return res.status(400).json({ message: "User already liked this post" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await CirclePost.findById(postId);
    if (post.likedBy.includes(userId)) {
      post.likedBy = post.likedBy.filter((id) => id.toString() != userId);
      post.likes -= 1;
      await post.save();
      return res.status(200).json(post);
    } else {
      return res.status(400).json({ message: "User has not liked this post" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


