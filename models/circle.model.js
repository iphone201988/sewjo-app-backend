import mongoose from "mongoose";

const circleSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        unique: true,
      },
      description: {
        type: String,
      },
      privacy: {
        type: String,
        enum: ["Public", "Private"],
        default: "Private",
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );

circleSchema.index({ name: 1 }, { unique: true });
circleSchema.index({ owner: 1 });
circleSchema.index({ privacy: 1 });



const Circle = mongoose.model("Circle", circleSchema);

export default Circle;
  