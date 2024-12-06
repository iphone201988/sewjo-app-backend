import Joi from "joi";

export const addRatingSchema = {
  body: Joi.object({
    // type: Joi.string()
    //   .valid("Fabric", "Supply", "Pattern")
    //   .required()
    //   .messages({
    //     "string.base": "Type must be a string",
    //     "string.empty": "Type cannot be empty",
    //     "any.required": "Type is required",
    //     "any.only":
    //       "Type must be one of the following values: Fabric, Supply, Pattern",
    //   }),
    productRef: Joi.string().required().messages({
      "string.base": "Product reference must be a string",
      "string.empty": "Product reference cannot be empty",
      "any.required": "Product reference is required",
    }),
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating must be at most 5",
      "any.required": "Rating is required",
    }),
    comment: Joi.string().optional().messages({
      "string.base": "Comment must be a string",
    }),
  }),
};

export const deleteRatingSchema = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "id must be a string",
    }),
  }),
};
export const getRatingSchema = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "id must be a string",
    }),
  }),
};
