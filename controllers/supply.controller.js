import { errorHandler } from "../utils/error.js";
import Supply from "../models/supply.model.js";
import History from "../models/updateHistory.model.js";
import { fetchLinkedData } from "../helper/index.js";

export const createSupply = async (req, res, next) => {
  const userId = req.userId;
  try {
    const supply = await Supply.create({ ...req.body, userRef: userId });
    return res.status(201).json({
      success: true,
      message: "Supply created successfully!",
      supply,
    });
  } catch (error) {
    next(error);
  }
};


export const getSupplyDetails = async (req, res, next) => {
  try {
    const supply = await Supply.findOne({
      _id: req.params.id,
      userRef: req.userId,
    });
    
    if (!supply) {
      return next(errorHandler(404, "Supply not found!"));
    }

    if (req.userId !== supply.userRef) {
      return next(errorHandler(403, "You can only view your own supplies!"));
    }

    const history = await History.find({
      productRef: supply._id,
    }).sort({ createdAt: -1 });

    const allLinkStash = await fetchLinkedData(supply.linkStash);
    const allLinkStitchlog = await fetchLinkedData(supply.linkStitchlog);

    supply.linkStash = undefined;
    supply.linkStitchlog = undefined;


    return res.status(200).json({
      success: true,
      message: "Supply details retrieved successfully!",
      supply: {
        ...supply.toObject(),
        history,
        allLinkStash,
        allLinkStitchlog,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getAllSupplies = async (req, res, next) => {
  try {
    const userId = req.userId;
    const supplies = await Supply.find({ userRef: userId });
    if (!supplies) {
      return next(errorHandler(404, "No supplies found for this user!"));
    }
    let message;
    if (supplies.length === 0) {
      message = "No supplies found for this user!";
    } else {
      message = "Supplies retrieved successfully!";
    }
    return res.status(200).json({
      success: true,
      message,
      supplies,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupplyDetails = async (req, res, next) => {
  try {
    const {
      name,
      imageUrls,
      categories,
      unitsOfMeasure,
      color,
      quantity,
      brands,
      price,
      currency,
      tags,
      notes,
      reasons,
      linkStash,
      linkStitchlog,
    } = req.body;
    const supply = await Supply.findById(req.params.id);
    if (!supply) {
      return next(errorHandler(404, "Supply not found!"));
    }

    if (req.userId !== supply.userRef) {
      return next(errorHandler(401, "You can only update your own listings!"));
    }

    if (name) {
      supply.name = name;
    }
    if (imageUrls) {
      supply.imageUrls = imageUrls;
    }
    if (categories) {
      supply.categories = categories;
    }
    if (unitsOfMeasure) {
      supply.unitsOfMeasure = unitsOfMeasure;
    }
    if (color) {
      supply.color = color;
    }

    if(reasons){
      await History.create({
        productRef: supply._id,
        reasons,
        preQuantity: supply.quantity,
        curQuantity:quantity,
      });
    }

    if (quantity) {
      // if (quantity === supply.quantity) {
      //   return next(
      //     errorHandler(401, "quantity must be different from previous quantity")
      //   );
      // }
      supply.quantity = quantity;
    }
    if (brands) {
      supply.brands = brands;
    }
    if (price) {
      supply.price = price;
    }
    if (currency) {
      supply.currency = currency;
    }
    if (tags) {
      supply.tags = tags;
    }
    if (notes) {
      supply.notes = notes;
    }
    if (linkStash) {
      supply.linkStash = linkStash;
    }
    if(linkStitchlog){
      supply.linkStitchlog = linkStitchlog;
    }

    await supply.save();
    const history = await History.find({
      productRef: supply._id,
    }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Supply details updated successfully!",
      supply: {
        ...supply.toObject(),
        history,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSupply = async (req, res, next) => {
  try {
    const id = req.params.id;
    const supply = await Supply.findById(id);
    if (!supply) {
      return next(errorHandler(404, "supply not found!"));
    }
    if (req.userId !== supply.userRef) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }
    await Supply.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Supply deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
