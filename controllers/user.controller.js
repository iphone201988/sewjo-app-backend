import Fabric from "../models/fabric.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const singleUpload = async (req, res, next) => {
  try {
    console.log("here upload");
    if (req && req.file.filename == undefined)
      throw new Error("No file uploaded");
    console.log(req.file);
    res.status(200).json({
      success: true,
      message: "image upload successfully",
      url: `${process.env.BASE_URL}/image/${req.file.filename
        .trim()
        .replace(/\s+/g, "_")}`,
    });
  } catch (error) {
    console.log("error");
    next(error);
  }
};

export const multiUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0)
      throw new Error("No files uploaded");
    const urls = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      console.log(file);
      urls.push(
        `${process.env.BASE_URL}/image/${file.filename
          .trim()
          .replace(/\s+/g, "_")}`
      );
    }
    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      urls,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          displayName: req.body.displayName,
          email: req.body.email,
          password: req.body.password,
          profileImage: req.body.profileImage,
          unit: req.body.unit,
          currency: req.body.currency,
          bio: req.body.bio,
          city: req.body.city,
          country: req.body.country,
          bust: req.body.bust,
          waist: req.body.waist,
          hip: req.body.hip,
          height: req.body.height,
          bodyDimensionsUnit: req.body.bodyDimensionsUnit,
          skillLevel: req.body.skillLevel,
          preferredSewingStyles: req.body.preferredSewingStyles,
          sewingMachinesAndTools: req.body.sewingMachinesAndTools,
        },
      },
      { new: true }
    );
    const { password, ...restDetails } = updateUser._doc;
    res.status(200).json(restDetails);
  } catch (error) {
    next(error);
  }
};

export const getFabricList = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const fabricList = await Fabric.find({ userRef: req.params.id });
      res.status(200).json(fabricList);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own fabric stash"));
  }
};
