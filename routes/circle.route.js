import express from "express";
import {
  createCircle,
  updateCircle,
  addMemberToCircle,
  removeMemberFromCircle,
  getMembersOfCircle,
  getUserCircles,
  getCircleWithOwner,
  getAllCirclesWithOwners,
  getCircleWithMembersAndOwner,
} from "../controllers/circle.controller.js";
import {
  addMemeberToCircleSchema,
  createCircleSchema,
  getAllCircleWithOwnerSchema,
  getCircleMembersSchema,
  getCircleWithOwnerSchema,
  getUserFromCircleSchema,
  removeMemeberFromCircleSchema,
  updateCircleSchema,
  getCircleWithMembersAndOwnerSchema,
} from "../schema/circle.schema.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

// Create a new circle
router.post("/", validate(createCircleSchema), createCircle);

// Update circle details (requires owner authorization)
router.put("/:circleId", validate(updateCircleSchema), updateCircle);

// Add a member to a circle
router.post(
  "/:circleId/members/:userId",
  validate(addMemeberToCircleSchema),
  addMemberToCircle
);

// Remove a member from a circle (only owner or user can remove)
router.delete(
  "/:circleId/members/:userId/:requesterId",
  validate(removeMemeberFromCircleSchema),
  removeMemberFromCircle
);

// Get all members of a circle
router.get(
  "/:circleId/members",
  validate(getCircleMembersSchema),
  getMembersOfCircle
);

// Get all circles a user belongs to
router.get("/user/:userId", validate(getUserFromCircleSchema), getUserCircles);

// Get a specific circle with owner information
router.get(
  "/:circleId/with-owner",
  validate(getCircleWithOwnerSchema),
  getCircleWithOwner
);

// Get all circles with each circle’s owner details
router.get(
  "/with-owners",
  validate(getAllCircleWithOwnerSchema),
  getAllCirclesWithOwners
);

// Get a circle with both owner and members
router.get(
  "/:circleId/with-members-and-owner",
  validate(getCircleWithMembersAndOwnerSchema),
  getCircleWithMembersAndOwner
);

export default router;
