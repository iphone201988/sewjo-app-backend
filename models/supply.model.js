import mongoose from "mongoose";

const supplySchema = new mongoose.Schema(
  {
    name: { type: String },
    imageUrls: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    unitsOfMeasure: { type: [String], default: [] },
    color: { type: String },
    quantity: { type: Number, default: 1 },
    brands: { type: [String], default: [] },
    price: { type: Number, default: 0 },
    currency: { type: String, default: "CAD" },
    tags: { type: [String], default: [] },
    notes: { type: String },
    userRef: { type: String },
    linkStash: { type: Array },
    linkStitchlog: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Supply = mongoose.model("Supply", supplySchema);
export default Supply;
