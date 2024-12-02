import mongoose from "mongoose";

const patternSchema = new mongoose.Schema(
  {
    name: { type: String },
    imageUrls: { type: [String], default: [] },
    brand: { type: String },
    patternType: { type: [String] },
    format: { type: String },
    skillLevel: { type: String },
    sizeMake: { type: String },
    connectStash: { type: String },
    isExist: { type: String, enum: ["1", "2"], default: "2" }, // 1:Yes  2:No
    description: { type: String },
    specification: { type: String },
    fabricRequirement: { type: String },
    notionRequirement: { type: String },
    minSize: { type: String },
    maxSize: { type: String },
    ageGroup: { type: String },
    location: { type: String },
    purchaseFrom: { type: String },
    purchaseDate: { type: String },
    purchaseCost: { type: Number },
    patternLink: { type: [String] },
    timesMade: { type: Number },
    successRating: { type: Number },
    makeAgain: {
      type: String,
      enum: ["1", "2"],
      default: "2", //1:Yes 2:No
    },
    difficultyRating: { type: Number },
    notes: { type: String },
    modification: { type: String },
    userRef: { type: String },
  },
  {
    timestamps: true,
  }
);

const Pattern = mongoose.model("pattern", patternSchema);

export default Pattern;
