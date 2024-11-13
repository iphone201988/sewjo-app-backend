import mongoose from "mongoose";

const customizeFieldsSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
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
