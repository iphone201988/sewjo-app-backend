import CustomizeFields from "../models/customizeFields.js";

export const cr̥eateCustomizeFields = async (req, res, next) => {
  try {
    const customizeFields = new CustomizeFields(req.body);
    await customizeFields.save();
    res.status(201).json(customizeFields);
  } catch (error) {
    next(error);
  }
};

export const getCustomizeFields = async (req, res, next) => {
  try {
    const customizeFields = await CustomizeFields.findOne();

    if (!customizeFields) {
      return res.status(404).json({
        success: false,
        message: "customize fields not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customizeFields,
      message: "customize fields fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomizeFields = async (req, res, next) => {
  try {
    const { fabric, notion } = req.body;
    const customizeFields = await CustomizeFields.findOne();
    if (!customizeFields) {
      return res.status(404).json({
        success: false,
        message: "customize fields not found",
      });
    }
    if (fabric) {
      customizeFields.fabric = fabric;
    }
    if (notion) {
      customizeFields.notion = notion;
    }

    await customizeFields.save();

    return res.status(200).json({
      success: true,
      message: "Fabric fields updated successfully",
      data: customizeFields,
    });
  } catch (error) {
    next(error);
  }
};
