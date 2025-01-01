import Circle from "../models/circle.model.js";
import CircleMembership from "../models/circleMembership.model.js";
import { errorHandler } from "../utils/error.js";

export const getCircleWithOwner = async (req, res, next) => {
  try {
    const { circleId } = req.params;
    const circle = await Circle.findById(circleId).populate("owner");
    if (!circle) {
      return next(errorHandler(404, "circle not found!"));
    }
    res.status(200).json(circle);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCircle = async (req, res, next) => {
  try {
    const { name, description, privacy, owner } = req.body;
    const existingCircle = await Circle.findOne({ name });
    if (existingCircle) {
      return next(errorHandler(400, "A circle with this name already exists."));
    }
    const newCircle = await Circle.create({
      name,
      description,
      privacy,
      owner,
    });
    await CircleMembership.create({
      circle: newCircle._id,
      user: owner,
    });
    res.status(200).json(newCircle);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCircle = async (req, res, next) => {
  try {
    const { circleId } = req.params;
    const { name, description, privacy, owner } = req.body;
    const circle = await Circle.findById(circleId);
    if (!circle) {
      return next(errorHandler(404, "Circle not found!"));
    }
    if (circle.owner.toString() !== owner) {
      return next(errorHandler(403, "You are not the owner of this circle!"));
    }

    circle.name = name || circle.name;
    circle.description = description || circle.description;
    circle.privacy = privacy || circle.privacy;
    await circle.save();

    res.status(200).json(circle);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMemberToCircle = async (req, res, next) => {
  try {
    const { circleId, userId } = req.params;
    const existingMembership = await CircleMembership.findOne({
      circle: circleId,
      user: userId,
    });
    if (existingMembership) {
      return next(
        errorHandler(400, "User is already a member of this circle.")
      );
    }
    const membership = await CircleMembership.create({
      circle: circleId,
      user: userId,
    });
    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeMemberFromCircle = async (req, res, next) => {
  try {
    const { circleId, userId, requesterId } = req.params;

    const circle = await Circle.findById(circleId);
    if (!circle) {
      return next(errorHandler(404, "Circle not found."));
    }
    if (circle.owner.toString() !== requesterId && userId !== requesterId) {
      return next(
        errorHandler(
          403,
          "You are not authorized to remove this user from the circle"
        )
      );
    }

    const result = await CircleMembership.findOneAndDelete({
      circle: circleId,
      user: userId,
    });

    if (!result) {
      return next(errorHandler(404, "Member not found in circle"));
    }

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMembersOfCircle = async (req, res, next) => {
  try {
    const { circleId } = req.params;
    const memberships = await CircleMembership.find({
      circle: circleId,
    }).populate("user");
    const members = memberships.map((membership) => membership.user);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserCircles = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;
    if (page && limit) {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;

      const memberships = await CircleMembership.find({ user: userId })
        .populate("circle")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      const circles = memberships.map((membership) => membership.circle);

      const totalCircles = await CircleMembership.countDocuments({
        user: userId,
      });
      const totalPages = Math.ceil(totalCircles / limitNum);

      return res.status(200).json({
        circles,
        currentPage: pageNum,
        totalPages,
      });
    } else {
      const memberships = await CircleMembership.find({
        user: userId,
      }).populate("circle");
      const circles = memberships.map((membership) => membership.circle);
      return res.status(200).json({ circles });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCirclesWithOwners = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const searchFilter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};
    const circles = await Circle.find(searchFilter)
      .populate("owner")
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
    const totalCircles = await Circle.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalCircles / limitNum);
    res.status(200).json({
      circles,
      currentPage: pageNum,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCircleWithMembersAndOwner = async (req, res, next) => {
  try {
    const { circleId } = req.params;

    const circle = await Circle.findById(circleId).populate("owner");
    if (!circle) {
      return next(errorHandler(404, "Circle not found!"));
    }
    const memberships = await CircleMembership.find({
      circle: circleId,
    }).populate("user");
    const members = memberships.map((membership) => membership.user);
    const response = {
      ...circle.toObject(),
      members,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
