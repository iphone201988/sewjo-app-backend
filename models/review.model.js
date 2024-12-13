import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
    },
    title:{
      type: String,
    },
    description: {
      type: String,
    },
    size:{
      type: String,
    },
    fabricUse:{
      type: String,
    },
    imageUrls: {
      type: [String],
    },
    isPublic:{
      type: Boolean,
      default: false,
    },
    notWorked:{
      type: [String],
    },
    worked:{
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
