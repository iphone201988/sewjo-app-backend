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
    title: Joi.string().max(30).optional().messages({
      "string.base": "Title must be a string",
      "string.max": "Title cannot exceed 30 characters",
    }),
    description: Joi.string().max(500).optional().messages({
      "string.base": "Description must be a string",
      "string.max": "Description cannot exceed 500 characters",
    }),
    size: Joi.string().optional().messages({
      "string.base": "Size must be a string",
    }),
    fabricUse: Joi.string().optional().messages({
      "string.base": "Fabric use must be a string",
    }),
    imageUrls: Joi.array().items(Joi.string().uri()).optional().messages({
      "array.base": "Image URLs must be an array",
      "string.uri": "Each image URL must be a valid URL",
    }),
    isPublic: Joi.boolean().optional().messages({
      "boolean.base": "isPublic must be a boolean",
    }),
    notWorked: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Not Worked must be an array of strings",
      "string.base": "Each item in Not Worked must be a string",
    }),
    worked: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Worked must be an array of strings",
      "string.base": "Each item in Worked must be a string",
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

export const updateRatingSchema ={
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "id must be a string",
    }),
  }),
  body: Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating must be at most 5",
      "any.required": "Rating is required",
    }),
    title: Joi.string().max(30).optional().messages({
      "string.base": "Title must be a string",
      "string.max": "Title cannot exceed 30 characters",
    }),
    description: Joi.string().max(500).optional().messages({
      "string.base": "Description must be a string",
      "string.max": "Description cannot exceed 500 characters",
    }),
    size: Joi.string().optional().messages({
      "string.base": "Size must be a string",
    }),
    fabricUse: Joi.string().optional().messages({
      "string.base": "Fabric use must be a string",
    }),
    imageUrls: Joi.array().items(Joi.string().uri()).optional().messages({
      "array.base": "Image URLs must be an array",
      "string.uri": "Each image URL must be a valid URL",
    }),
    isPublic: Joi.boolean().optional().messages({
      "boolean.base": "isPublic must be a boolean",
    }),
    notWorked: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Not Worked must be an array of strings",
      "string.base": "Each item in Not Worked must be a string",
    }),
    worked: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Worked must be an array of strings",
      "string.base": "Each item in Worked must be a string",
    }),
  })
}
export const getRatingSchema = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "id must be a string",
    }),
  }),
};
