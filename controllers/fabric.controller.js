import { errorHandler } from "../utils/error.js";
import Fabric from "../models/fabric.model.js";

export const createFabricStash = async (req, res, next) => {
  try {
    const fabric = await Fabric.create(req.body);
    return res.status(201).json(fabric);
  } catch (error) {
    next(error);
  }
};

export const getFabricDetails = async (req, res, next) => {
  try {
    const fabric = await Fabric.findById(req.params.id);
    if (!fabric) {
      return next(errorHandler(404, "Fabric not found!"));
    }
    return res.status(200).json(fabric);
  } catch (error) {
    next(error);
  }
};

export const getAllFabric = async (req, res, next) => {
  try {
    const fabric = await Fabric.find(); // Fetch all supplies
    return res.status(200).json(fabric); // Send the supplies as response
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
};

export const updateFabricDetails = async (req, res, next) => {
  const fabric = await Fabric.findById(req.params.id);
  const {
    name,
    description,
    material,
    width,
    widthType,
    weight,
    weightType,
    color,
    price,
    imageUrls,
    userRef,
    length,
    lenghtType,
    quantity,
    weave,
    usageIntent,
    fabricName,
    Pattern,
    stretchtype,
    stretchWidth,
    stretchLength,
    shrinkage,
    drape,
    imperfection,
    shope,
    currencyType,
    currency,
    location,
    note,
    tags,
    fabricContent,
    lengthValue,
    widthValue,
  } = req.body;
  if (!fabric) {
    return next(errorHandler(404, "Fabric not found!"));
  }

  // if (req.user.id !== fabric.userRef) {
  //   return next(errorHandler(401, "You can only update your own listings!"));
  // }

  if (name) {
    fabric.name = name;
  }
  if (description) {
    fabric.description = description;
  }
  if (material) {
    fabric.material = material;
  }
  if (width) {
    fabric.width = width;
  }
  if (widthType) {
    fabric.widthType = widthType;
  }
  if (weight) {
    fabric.weight = weight;
  }
  if (weightType) {
    fabric.weightType = weightType;
  }
  if (color) {
    fabric.color = color;
  }
  if (price) {
    fabric.price = price;
  }
  if (imageUrls) {
    fabric.imageUrls = imageUrls;
  }
  if (userRef) {
    fabric.userRef = userRef;
  }
  if (length) {
    fabric.length = length;
  }
  if (lenghtType) {
    fabric.lenghtType = lenghtType;
  }
  if (quantity) {
    fabric.quantity = quantity;
  }
  if (weave) {
    fabric.weave = weave;
  }
  if (usageIntent) {
    fabric.usageIntent = usageIntent;
  }
  if (fabricName) {
    fabric.fabricName = fabricName;
  }
  if (Pattern) {
    fabric.Pattern = Pattern;
  }
  if (stretchtype) {
    fabric.stretchtype = stretchtype;
  }
  if (stretchWidth) {
    fabric.stretchWidth = stretchWidth;
  }
  if (stretchLength) {
    fabric.stretchLength = stretchLength;
  }
  if (shrinkage) {
    fabric.shrinkage = shrinkage;
  }
  if (drape) {
    fabric.drape = drape;
  }
  if (imperfection) {
    fabric.imperfection = imperfection;
  }
  if (shope) {
    fabric.shope = shope;
  }
  if (currencyType) {
    fabric.currencyType = currencyType;
  }
  if (currency) {
    fabric.currency = currency;
  }
  if (location) {
    fabric.location = location;
  }
  if (note) {
    fabric.note = note;
  }
  if (tags) {
    fabric.tags = tags;
  }
  if (fabricContent) {
    fabric.fabricContent = fabricContent;
  }
  if (lengthValue) {
    fabric.lengthValue = lengthValue;
  }
  if (widthValue) {
    fabric.widthValue = widthValue;
  }

  try {
    await fabric.save();
    res.status(200).json({
      success: true,
      message: "Fabric updated successfully!",
      updatedFabric: fabric,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteFabric = async (req, res, next) => {
  try {
    const id = req.params.id;
    const fabric = await Fabric.findById(id);
    if (!fabric) {
      return next(errorHandler(404, "Fabric not found!"));
    }
    await Fabric.findByIdAndDelete(id);
    res.status(200).json({
      succccess: true,
      message: "Fabric deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
