import Pattern from "../models/pattern.model.js";
import { errorHandler } from "../utils/error.js";

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
      message: "Patterns retrieved successfully!",
      patterns,
    });
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