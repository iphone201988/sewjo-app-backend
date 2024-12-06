import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // type: {
    //   type: String,
    //   enum: ["Fabric", "Supply", "Pattern"],
    // },
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
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
