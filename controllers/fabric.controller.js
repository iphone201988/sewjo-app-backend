import { errorHandler } from "../utils/error.js";
import Fabric from "../models/fabric.model.js";
import History from "../models/updateHistory.model.js";
import { fetchLinkedData } from "../helper/index.js";

export const createFabricStash = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fabric = await Fabric.create({
      ...req.body,
      userRef: userId,
    });
    return res.status(201).json({
      success: true,
      message: "Fabric added successfully!",
      fabric,
    });
  } catch (error) {
    next(error);
  }
};

export const getFabricDetails = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fabric = await Fabric.findById({
      _id: req.params.id,
      userRef: userId,
    });
    if (!fabric) {
      return next(errorHandler(404, "Fabric not found!"));
    }
    const history = await History.find({
      productRef: fabric._id,
    }).sort({ createdAt: -1 });

    const allLinkStash = await fetchLinkedData(fabric.linkStash);
    const allLinkStitchlog = await fetchLinkedData(fabric.linkStitchlog);

    fabric.linkStash = undefined;
    fabric.linkStitchlog = undefined;

    return res.status(201).json({
      success: true,
      message: "Fabric Details found successfully!",
      fabric: {
        ...fabric.toObject(),
        history,
        allLinkStash,
        allLinkStitchlog 
      }
    }); 
  } catch (error) {
    next(error);
  }
};

export const getAllFabric = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fabric = await Fabric.find({
      userRef: userId,
    });
    if (!fabric) {
      return next(errorHandler(404, "Fabric not found!"));
    }
    fabric.forEach((element) => {
      element.price = element.price == null ? 0 : element.price;
    });
    let message;
    if (fabric.length === 0) {
      message = "No fabric found!";
    } else {
      message = "Fabric found successfully!";
    }
    return res.status(200).json({
      success: true,
      message,
      fabric,
    });
  } catch (error) {
    next(error);
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
    reasons,
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
    variant,
    linkStash,
    linkStitchlog,
  } = req.body;

  
  if (!fabric) {
    return next(errorHandler(404, "Fabric not found!"));
  }

  if (req.userId !== fabric.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

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
  let history;
  if(reasons){
    await History.create({
      productRef: fabric._id,
      reasons,
      preQuantity: fabric.quantity,
      curQuantity:quantity,
    });
  }
  if (quantity) {
    // if(quantity === fabric.quantity){
    //   return next(errorHandler(401, "quantity must be different from previous quantity"));
    // }
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
  if (variant) {
    fabric.variant = variant;
  }
  if(linkStash){
    fabric.linkStash = linkStash;
  }
  if(linkStitchlog){
    fabric.linkStitchlog = linkStitchlog;
  }
  history = await History.find({
    productRef: fabric._id,
  }).sort({ createdAt: -1 });

  try {
    await fabric.save();
    res.status(200).json({
      success: true,
      message: "Fabric updated successfully!",
      updatedFabric: {
        ...fabric.toObject(),
        history,
      },
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

    if (req.userId !== fabric.userRef) {
      return next(errorHandler(401, "You can only delete your own listings!"));
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
