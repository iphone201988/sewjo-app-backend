import Joi from "joi";

export const createFabricSchema = {
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    material: Joi.string().optional(),
    width: Joi.number().optional(),
    widthType: Joi.string().optional(),
    weight: Joi.number().optional(),
    weightType: Joi.string().optional(),
    color: Joi.string().optional(),
    price: Joi.number().optional(),
    imageUrls: Joi.array().items(Joi.string()).optional(),
    userRef: Joi.string().optional(),
    length: Joi.number().optional(),
    lengthType: Joi.string().optional(),
    quantity: Joi.number().optional(),
    weave: Joi.string().optional(),
    usageIntent: Joi.array().items(Joi.string()).optional(),
    fabricName: Joi.array().items(Joi.string()).optional(),
    Pattern: Joi.array().items(Joi.string()).optional(),
    stretchtype: Joi.string().optional(),
    stretchWidth: Joi.number().optional(),
    stretchLength: Joi.number().optional(),
    shrinkage: Joi.string().optional(),
    drape: Joi.number().optional(),
    imperfection: Joi.string().optional(),
    shope: Joi.string().optional(),
    currencyType: Joi.string().optional(),
    currency: Joi.number().optional(),
    location: Joi.string().optional(),
    note: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    fabricContent: Joi.array().items(Joi.string()).optional(),
    lengthValue: Joi.string().optional(),
    widthValue: Joi.string().optional(),
    lenghtType: Joi.string().optional(),
    variant: Joi.array()
      .items(Joi.object().pattern(Joi.string(), Joi.any()))
      .optional(),
  }),
};

export const updateFabricSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    material: Joi.string().optional(),
    width: Joi.number().optional(),
    widthType: Joi.string().optional(),
    weight: Joi.number().optional(),
    weightType: Joi.string().optional(),
    color: Joi.string().optional(),
    price: Joi.number().optional(),
    imageUrls: Joi.array().items(Joi.string()).optional(),
    userRef: Joi.string().optional(),
    length: Joi.number().optional(),
    lengthType: Joi.string().optional(),
    quantity: Joi.number().optional(),
    reasons: Joi.when('quantity', {
      is: Joi.number().greater(0),
      then: Joi.string().required().messages({
        'any.required': 'Reasons are required when quantity is provided',
      }),
      otherwise: Joi.string().optional(),
    }),
    weave: Joi.string().optional(),
    usageIntent: Joi.array().items(Joi.string()).optional(),
    fabricName: Joi.array().items(Joi.string()).optional(),
    Pattern: Joi.array().items(Joi.string()).optional(),
    stretchtype: Joi.string().optional(),
    stretchWidth: Joi.number().optional(),
    stretchLength: Joi.number().optional(),
    shrinkage: Joi.string().optional(),
    drape: Joi.number().optional(),
    imperfection: Joi.string().optional(),
    shope: Joi.string().optional(),
    currencyType: Joi.string().optional(),
    currency: Joi.number().optional(),
    location: Joi.string().optional(),
    note: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    fabricContent: Joi.array().items(Joi.string()).optional(),
    lengthValue: Joi.string().optional(),
    widthValue: Joi.string().optional(),
    lenghtType: Joi.string().optional(),
    variant: Joi.array()
      .items(Joi.object().pattern(Joi.string(), Joi.any()))
      .optional(),
  }),
};

export const deleteFabricSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export const getDetailsSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};