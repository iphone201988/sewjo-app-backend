import mongoose from "mongoose";

const customizeFieldsSchema = new mongoose.Schema(
  {
    userRef: { type: String },
    fabric: {
      type: Array,
    },
    notion: {
      type: Array,
    },
  },
  { timestamps: true }
);

const customizeFields = mongoose.model(
  "customizeFields",
  customizeFieldsSchema
);

export default customizeFields;
