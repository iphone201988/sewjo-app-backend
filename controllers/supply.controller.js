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
    console.log("params", req.params.id);

    const supply = await Supply.findById(req.params.id);
    if (!supply) {
      return next(errorHandler(404, "Supply not found!"));
    }

    // if (req.user.id !== supply.userRef) {
    //   return next(errorHandler(401, "You can only update your own listings!"));
    // }

    const updatedSupply = await Supply.findByIdAndUpdate(
      req.params.id,
      {
        ...supply,
        ...req.body,
      },
      { new: true }
    );
    console.log("req body",req.body);
    console.log("supply", supply);
    console.log("supply updated", updatedSupply);
    return res.status(200).json(updatedSupply);
  } catch (error) {
    next(error);
  }
};
