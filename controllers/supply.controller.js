import { errorHandler } from "../utils/error.js";
import Supply from "../models/supply.model.js";

// Create Supply
export const createSupply = async (req, res, next) => {
  try {
    const supply = await Supply.create(req.body);
    return res.status(201).json(supply);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get Supply Details
// Get Supply Details
export const getSupplyDetails = async (req, res, next) => {
  try {
    const supply = await Supply.findById(req.params.id);
    if (!supply) {
      return next(errorHandler(404, "Supply not found!"));
    }
    return res.status(200).json(supply);
  } catch (error) {
    next(error);
  }
};

export const getAllSupplies = async (req, res, next) => {
  try {
    const supplies = await Supply.find(); // Fetch all supplies
    return res.status(200).json(supplies); // Send the supplies as response
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
};

// Update Supply Details
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
    } = req.body;
    const supply = await Supply.findById(req.params.id);
    if (!supply) {
      return next(errorHandler(404, "Supply not found!"));
    }

    // if (req.user.id !== supply.userRef) {
    //   return next(errorHandler(401, "You can only update your own listings!"));
    // }

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
    if (quantity) {
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

    await supply.save();
    return res.status(200).json({
      success: true,
      message: "Supply details updated successfully!",
      supply,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSupply = async (req, res , next) => {
    try {
        const id = req.params.id;
        const supply = await Supply.findById(id);
        if (!supply) {
          return next(errorHandler(404, "supply not found!"));
        }
        await Supply.findByIdAndDelete(id);
        res.status(200).json({
          succccess: true,
          message: "Supply deleted successfully!",
        });
      } catch (error) {
        next(error);
      }
}
