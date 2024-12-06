import Fabric from "../models/fabric.model.js";
import History from "../models/updateHistory.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).split("controllers")[0];

const imageDir = path.join(__dirname, "view", "image");
const pdfDir = path.join(__dirname, "view", "pdf");

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

export const base64Upload = async (req, res, next) => {
  try {
    if (!req.body.file || !req.body.file.startsWith("data:")) {
      throw new Error("Invalid or missing Base64 data");
    }
    const base64Data = req.body.file.split(",")[1];
    const mimeType = req.body.file.split(";")[0].split(":")[1];
    const fileExtension = mime.extension(mimeType);
    if (!fileExtension) {
      throw new Error("Unsupported file type");
    }
    const fileName = `${uuidv4()}-${Date.now()}.${fileExtension}`;
    let filePath;
    if (mimeType.startsWith("image/")) {
      filePath = path.join(imageDir, fileName);
    } else if (mimeType === "application/pdf") {
      filePath = path.join(pdfDir, fileName);
    } else {
      throw new Error("Unsupported file type");
    }
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(filePath, buffer);
    const fileUrl = mimeType.startsWith("image/")
      ? `${process.env.BASE_URL}/image/${fileName}`
      : `${process.env.BASE_URL}/pdf/${fileName}`;
    res.status(200).json({
      success: true,
      message: `${
        mimeType.startsWith("image/") ? "Image" : "PDF"
      } uploaded successfully`,
      url: fileUrl,
    });
  } catch (error) {
    console.log("Error during Base64 upload:", error);
    next(error);
  }
};

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
  const {
    displayName,
    email,
    profileImage,
    unit,
    currency,
    bio,
    city,
    country,
    bust,
    waist,
    hip,
    height,
    bodyDimensionsUnit,
    skillLevel,
    preferredSewingStyles,
    sewingMachinesAndTools,
  } = req.body;
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) return next(errorHandler(404, "User not found"));
    if (email && user.email !== email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return next(errorHandler(400, "Email already in use"));
    }
    if (email) {
      user.email = email;
    }
    if (displayName) {
      user.displayName = displayName;
    }
    if (profileImage) {
      user.profileImage = profileImage;
    }
    if (unit) {
      user.unit = unit;
    }
    if (currency) {
      user.currency = currency;
    }
    if (bio) {
      user.bio = bio;
    }
    if (city) {
      user.city = city;
    }
    if (country) {
      user.country = country;
    }
    if (bust) {
      user.bust = bust;
    }
    if (waist) {
      user.waist = waist;
    }
    if (hip) {
      user.hip = hip;
    }
    if (height) {
      user.height = height;
    }
    if (bodyDimensionsUnit) {
      user.bodyDimensionsUnit = bodyDimensionsUnit;
    }
    if (skillLevel) {
      user.skillLevel = skillLevel;
    }
    if (preferredSewingStyles) {
      user.preferredSewingStyles = preferredSewingStyles;
    }
    if (sewingMachinesAndTools) {
      user.sewingMachinesAndTools = sewingMachinesAndTools;
    }
    const restDetails = await user.save();

    restDetails.password = undefined;
    restDetails.deviceToken = undefined;
    restDetails.deviceType = undefined;
    restDetails.__v = undefined;
    restDetails.isDeleted = undefined;

    res.status(201).json({
      success: true,
      message: "User details updated successfully",
      user: restDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getFabricList = async (req, res, next) => {
  try {
    const fabricList = await Fabric.find({ userRef: req.userId });
    if (!fabricList) {
      return next(errorHandler(404, "Fabric not found"));
    }
    let message;
    if (fabricList.length === 0) {
      message = "No fabric found";
    } else {
      message = "Fabric list retrieved successfully";
    }
    res.status(200).json({
      success: true,
      message,
      fabricList,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHistory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { reasons } = req.body;
    const history = await History.findOne({ _id: id });
    if (!history) {
      return next(errorHandler(404, "History not found"));
    }
    if (reasons) {
      history.reasons = reasons;
    }
    await history.save();
    res.status(200).json({
      success: true,
      message: "History updated successfully",
      history,
    });
  } catch (error) {
    next(error);
  }
};
