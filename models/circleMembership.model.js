import mongoose from "mongoose";

const circleMembershipSchema = new mongoose.Schema({
  circle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circle",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

circleMembershipSchema.index({ circle: 1 });
circleMembershipSchema.index({ user: 1 });
circleMembershipSchema.index({ circle: 1, user: 1 }, { unique: true });


const CircleMembership = mongoose.model("CircleMembership", circleMembershipSchema);

export default CircleMembership;
