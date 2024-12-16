import Pattern from "../models/pattern.model.js";
import { errorHandler } from "../utils/error.js";
import { fetchLinkedData } from "../helper/index.js";
import mongoose from "mongoose";

export const createPattern = async (req, res, next) => {
  const userId = req.userId;
  try {
    const pattern = new Pattern({
      ...req.body,
      userRef: userId,
    });
    await pattern.save();
    return res.status(201).json({
      success: true,
      message: "pattern created successfully!",
      pattern,
    });
  } catch (error) {
    next(error);
  }
};

export const getPatternDetails = async (req, res, next) => {
  const patternId = req.params.id;
  const userId = req.userId;
  try {
    const pattern = await Pattern.findOne({
      _id: patternId,
      userRef: userId,
    });
    if (!pattern) {
      return next(errorHandler(404, "Pattern not found!"));
    }
    if (userId !== pattern.userRef) {
      return next(errorHandler(403, "You can only view your own pattern!"));
    }

    const allLinkStash = await fetchLinkedData(pattern.linkStash);
    const allLinkStitchlog = await fetchLinkedData(pattern.linkStitchlog);

    pattern.linkStash = allLinkStash;
    pattern.linkStitchlog = allLinkStitchlog;

    res.status(200).json({
      success: true,
      message: "pattern details retrieved successfully!",
      pattern,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPattern = async (req, res, next) => {
  const userId = req.userId;
  try {
    const patterns = await Pattern.find({ userRef: userId });
    if (!patterns) {
      return next(errorHandler(404, "Patterns not found"));
    }
    let message;
    if (patterns.length === 0) {
      message = "No patterns found";
    } else {
      message = "Patterns retrieved successfully";
    }
    res.status(200).json({
      success: true,
      message,
      patterns,
    });
  } catch (error) {
    next(error);
  }
};

export const GlobalPatternSearch = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search;
    let qry = { isPublic: true };
    if (search) {
      qry = {
        ...qry,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { tags: { $elemMatch: { $regex: search, $options: "i" } } },
        ],
      };
    }

    const skip = (page - 1) * limit;

    const patterns = await Pattern.find(qry).skip(skip).limit(limit).exec();

    const totalPatterns = await Pattern.countDocuments(qry);
    const totalPages = Math.ceil(totalPatterns / limit);

    let PopularPattern = [];
    if (!search) {
      PopularPattern = await Pattern.find({
        searchCount: { $gt: 0 },
        isPublic: true,
      })
        .sort({ searchCount: -1 })
        .limit(10);
    }
    let message;
    if (patterns.length === 0) {
      message = "No patterns found";
    } else {
      message = "Patterns retrieved successfully";
    }
    res.status(200).json({
      success: true,
      message,
      ...(search && { patterns }),
      ...(search && { totalResults: totalPatterns }),
      ...(search && { currentPage: page }),
      ...(search && { limit }),
      ...(search && { totalPages }),
      ...(PopularPattern.length > 0 && { PopularPattern }),
    });
  } catch (error) {
    next(error);
  }
};

export const updateSeachCount = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(400, "Invalid pattern ID!"));
    }
    const result = await Pattern.updateOne(
      { _id: id },
      { $inc: { searchCount: 1 } }
    );
    if (result.nModified === 0) {
      return next(errorHandler(404, "Pattern not found!"));
    }
    res
      .status(200)
      .json({ success: true, message: "Search count updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatePattern = async (req, res, next) => {
  const patternId = req.params.id;
  const userId = req.userId;
  const {
    name,
    imageUrls,
    brand,
    patternType,
    format,
    skillLevel,
    sizeMake,
    connectStash,
    isExist,
    description,
    specification,
    fabricRequirement,
    notionRequirement,
    minSize,
    maxSize,
    ageGroup,
    location,
    purchaseFrom,
    purchaseDate,
    purchaseCost,
    patternLink,
    timesMade,
    successRating,
    makeAgain,
    difficultyRating,
    notes,
    modification,
    sizeUnit,
    categoryType,
    specificStyle,
    isItemStitched,
    patternView,
    price,
    priceUnit,
    tags,
    linkStash,
    linkStitchlog,
    isPublic,
    numberOfPrice,
    viewSizes,
    addedValues,
    imageTags
  } = req.body;
  try {
    const pattern = await Pattern.findOne({ _id: patternId, userRef: userId });
    if (!pattern) {
      return next(errorHandler(404, "Pattern not found!"));
    }
    if (name) {
      pattern.name = name;
    }
    if (imageUrls) {
      pattern.imageUrls = imageUrls;
    }
    if (brand) {
      pattern.brand = brand;
    }
    if (patternType) {
      pattern.patternType = patternType;
    }
    if (format) {
      pattern.format = format;
    }
    if (skillLevel) {
      pattern.skillLevel = skillLevel;
    }
    if (sizeMake) {
      pattern.sizeMake = sizeMake;
    }
    if (connectStash) {
      pattern.connectStash = connectStash;
    }
    if (isExist) {
      pattern.isExist = isExist;
    }
    if (description) {
      pattern.description = description;
    }
    if (specification) {
      pattern.specification = specification;
    }
    if (fabricRequirement) {
      pattern.fabricRequirement = fabricRequirement;
    }
    if (notionRequirement) {
      pattern.notionRequirement = notionRequirement;
    }
    if (minSize) {
      pattern.minSize = minSize;
    }
    if (maxSize) {
      pattern.maxSize = maxSize;
    }
    if (ageGroup) {
      pattern.ageGroup = ageGroup;
    }
    if (location) {
      pattern.location = location;
    }
    if (purchaseFrom) {
      pattern.purchaseFrom = purchaseFrom;
    }
    if (purchaseDate) {
      pattern.purchaseDate = purchaseDate;
    }
    if (purchaseCost) {
      pattern.purchaseCost = purchaseCost;
    }
    if (patternLink) {
      pattern.patternLink = patternLink;
    }
    if (timesMade) {
      pattern.timesMade = timesMade;
    }
    if (successRating) {
      pattern.successRating = successRating;
    }
    if (makeAgain) {
      pattern.makeAgain = makeAgain;
    }
    if (difficultyRating) {
      pattern.difficultyRating = difficultyRating;
    }
    if (notes) {
      pattern.notes = notes;
    }
    if (modification) {
      pattern.modification = modification;
    }
    if (sizeUnit) {
      pattern.sizeUnit = sizeUnit;
    }
    if (categoryType) {
      pattern.categoryType = categoryType;
    }
    if (specificStyle) {
      pattern.specificStyle = specificStyle;
    }

    if (isItemStitched) {
      pattern.isItemStitched = isItemStitched;
    }
    if (patternView) {
      pattern.patternView = patternView;
    }
    if (price) {
      pattern.price = price;
    }
    if (priceUnit) {
      pattern.priceUnit = priceUnit;
    }
    if (tags) {
      pattern.tags = tags;
    }
    if (linkStash) {
      pattern.linkStash = linkStash;
    }
    if (linkStitchlog) {
      pattern.linkStitchlog = linkStitchlog;
    }
    if (numberOfPrice) {
      pattern.numberOfPrice = numberOfPrice;
    }
    if (viewSizes) {
      pattern.viewSizes = viewSizes;
    }
    if (addedValues) {
      pattern.addedValues = addedValues;
    }
    if(imageTags){
      pattern.imageTags = imageTags;
    }

    pattern.isPublic = isPublic ?? pattern.isPublic;

    await pattern.save();
    res.status(200).json({
      success: true,
      message: "Pattern updated successfully!",
      pattern,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePattern = async (req, res, next) => {
  try {
    const patternId = req.params.id;
    const userId = req.userId;
    const pattern = await Pattern.findOneAndDelete({
      _id: patternId,
      userRef: userId,
    });
    if (!pattern) {
      return next(errorHandler(404, "Pattern not found!"));
    }
    res.status(200).json({
      success: true,
      message: "Pattern deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
