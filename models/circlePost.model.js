import mongoose from "mongoose";

const circlePostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    circle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circle",
      required: true,
    },
    theme: {
      type: String,
      enum: [
        "Question",
        "Recommendation",
        "Help Needed",
        "Tutorial/Guide",
        "Showcase/Finished Project",
        "In Progress",
        "Review",
        "Event/Meetup",
        "Discussion",
        "Poll/Vote",
      ],
      required: true,
    },
    title: {
      type: String,
      maxLength: 120,
      required: true,
    },
    content: {
      type: String,
      maxLength: 1000,
      required: true,
    },
    linkedItems: {
      fabric: { type: String, maxLength: 150 },
      pattern: { type: String, maxLength: 150 },
    },
    videoUrl: {
      type: String,
    },
    images: {
      type: [String], // Array of image URLs
      validate: {
        validator: function (arr) {
          return arr.every((url) => typeof url === 'string');
        },
        message: "Each image URL must be a string",
      },
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
    commentCount: {  // Total number of comments and replies
      type: Number,
      default: 0,
    },
    swatches: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

circlePostSchema.index({ user: 1 });
circlePostSchema.index({ circle: 1 });

const CirclePost = mongoose.model("CirclePost", circlePostSchema);

export default CirclePost;