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
  if (!fabric) {
    return next(errorHandler(404, "Fabric not found!"));
  }
  if (req.user.id !== fabric.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedFabric = await Fabric.findByIdAndUpdate(
      req.params.id,
      {
        ...fabric,
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFabric);
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
