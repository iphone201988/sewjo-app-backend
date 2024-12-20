import Joi from "joi";

export const createSupplySchema = {
  body: Joi.object({
    name: Joi.string().optional().default(""),
    imageUrls: Joi.array().items(Joi.string()).optional().default([]),
    categories: Joi.array().items(Joi.string()).optional().default([]),
    unitsOfMeasure: Joi.array().items(Joi.string()).optional().default([]),
    color: Joi.string().optional().default(""),
    quantity: Joi.number().optional().default(1),
    brands: Joi.array().items(Joi.string()).optional().default([]),
    price: Joi.number().optional(),
    currency: Joi.string().optional().default("CAD"),
    tags: Joi.array().items(Joi.string()).optional().default([]),
    notes: Joi.string().optional().default(""),
    linkStash: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStash" should be an array of strings',
    }),
    linkStitchlog: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStitchlog" should be an array of strings',
    })
  }),
};

export const updateSupplySchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().optional().default(""),
    imageUrls: Joi.array().items(Joi.string()).optional().default([]),
    categories: Joi.array().items(Joi.string()).optional().default([]),
    unitsOfMeasure: Joi.array().items(Joi.string()).optional().default([]),
    color: Joi.string().optional().default(""),
    quantity: Joi.number().optional().default(1),
    reasons: Joi.string().optional(),
    brands: Joi.array().items(Joi.string()).optional().default([]),
    price: Joi.number().optional(),
    currency: Joi.string().optional().default("CAD"),
    tags: Joi.array().items(Joi.string()).optional().default([]),
    notes: Joi.string().optional().default(""),
    linkStash: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStash" should be an array of strings',
    }),
    linkStitchlog: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStitchlog" should be an array of strings',
    })
  }),
};
export const deletesupplySchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export const getDetailsSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
