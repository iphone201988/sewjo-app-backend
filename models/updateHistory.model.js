import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    productRef: { type: String },
    preQuantity: { type: Number },
    curQuantity: { type: Number},
    reasons: { type: String },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);
export default History;
