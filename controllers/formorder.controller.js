import FormOrder from "../models/formOrder.model.js";

export const createFormOrder = async (req, res, next) => {
  try {
    let order = await FormOrder.create(req.body);
    res.status(201).json({
      success: true,
      message: "Form Order created successfully!",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getFormOrderById = async (req, res, next) => {
  try {
    const order = await FormOrder.findOne({
      form_id: req.params.form_id,
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Form Order not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Form Order found successfully!",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFormOrder = async (req, res, next) => {
  try {
    const order = await FormOrder.findOne({
      form_id: req.params.form_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Form Order not found!",
      });
    }
    if (req.body.form_order) {
      order.form_order = req.body.form_order;
    }
    res.status(200).json({
      success: true,
      message: "Form Order updated successfully!",
      order,
    });
  } catch (error) {
    next(error);
  }
};
