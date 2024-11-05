import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
    },
    unit: {
      type: String,
    },
    currency: {
      type: String,
    },
    bio: {
      type: String,
      maxLength: 150,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    bust: {
      type: String,
    },
    waist: {
      type: String,
    },
    hip: {
      type: String,
    },
    height: {
      type: String,
    },
    bodyDimensionsUnit: {
      type: String,
      enum: ["Inch", "Cm"],
      default: "Inch",
    },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    preferredSewingStyles: {
      type: [String],
    },
    sewingMachinesAndTools: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
