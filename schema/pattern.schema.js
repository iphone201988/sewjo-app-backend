import Joi from "joi";

export const createPatternSchema = {
  body: Joi.object({
    name: Joi.string().optional().messages({
      "string.base": '"name" should be a type of string',
    }),

    imageUrls: Joi.array()
      .items(Joi.string().uri())
      .default([])
      .optional()
      .messages({
        "array.base": '"imageUrls" should be an array of valid URLs',
      }),

    brand: Joi.string().optional().messages({
      "string.base": '"brand" should be a type of string',
    }),

    patternType: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"patternType" should be an array of strings',
    }),

    format: Joi.string()
      .optional()
      .messages({
        "string.base": '"format" should be a type of string',
      }),

    skillLevel: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"skillLevel" should be an array of strings',
    }),

    sizeMake: Joi.string().optional().messages({
      "string.base": '"sizeMake" should be a type of string',
    }),

    connectStash: Joi.string().valid("Yes", "No").optional().messages({
      "string.base": '"connectStash" should be a type of string',
      "string.valid": '"connectStash" must be either "Yes" or "No"',
    }),

    isExist: Joi.string().valid("1", "2").default("2").optional().messages({
      "string.base": '"isExist" should be a type of string',
      "string.valid": '"isExist" must be either "1" or "2"',
    }),

    description: Joi.string().optional().messages({
      "string.base": '"description" should be a type of string',
    }),

    specification: Joi.string().optional().messages({
      "string.base": '"specification" should be a type of string',
    }),

    fabricRequirement: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"fabricRequirement" should be an array of strings',
    }),

    notionRequirement: Joi.string().optional().messages({
      "string.base": '"notionRequirement" should be a type of string',
    }),

    minSize: Joi.string().optional().messages({
      "string.base": '"minSize" should be a type of string',
    }),

    maxSize: Joi.string().optional().messages({
      "string.base": '"maxSize" should be a type of string',
    }),

    ageGroup: Joi.string().optional().messages({
      "string.base": '"ageGroup" should be a type of string',
    }),

    location: Joi.string().optional().messages({
      "string.base": '"location" should be a type of string',
    }),

    purchaseFrom: Joi.string().optional().messages({
      "string.base": '"purchaseFrom" should be a type of string',
    }),

    purchaseDate: Joi.string().optional().messages({
      "string.base": '"purchaseDate" should be a type of string',
    }),

    purchaseCost: Joi.number().optional().messages({
      "number.base": '"purchaseCost" should be a type of number',
    }),

    patternLink: Joi.string().optional().messages({
      "string.base": '"patternLink" should be a type of string',
    }),

    timesMade: Joi.number().optional().messages({
      "number.base": '"timesMade" should be a type of number',
    }),

    successRating: Joi.number().min(1).max(5).optional().messages({
      "number.base": '"successRating" should be a type of number',
      "number.min": '"successRating" should be at least 1',
      "number.max": '"successRating" should be at most 5',
    }),

    makeAgain: Joi.string().valid("1", "2").default("2").optional().messages({
      "string.base": '"makeAgain" should be a type of string',
      "string.valid": '"makeAgain" must be either "1" or "2"',
    }),

    difficultyRating: Joi.number().min(1).max(5).optional().messages({
      "number.base": '"difficultyRating" should be a type of number',
      "number.min": '"difficultyRating" should be at least 1',
      "number.max": '"difficultyRating" should be at most 5',
    }),

    notes: Joi.string().optional().messages({
      "string.base": '"notes" should be a type of string',
    }),

    modification: Joi.string().optional().messages({
      "string.base": '"modification" should be a type of string',
    }),
    sizeUnit: Joi.string().optional().messages({
      "string.base": '"sizeUnit" should be a type of string',
    }),
    categoryType: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"categoryType" should be an array of strings',
    }),
    specificStyle: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"specificStyle" should be an array of strings',
    }),
    isItemStitched: Joi.boolean().optional(),
    patternView: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"patternView" should be an array of strings',
    }),
    fabricRequirement: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"fabricRequirement" should be an array of strings',
    }),
    price: Joi.number().optional().messages({
      "string.base": '"notes" should be a type of number',
    }),
    priceUnit: Joi.string().optional().messages({
      "string.base": '"priceUnit" should be a type of string',
    }),
    uploadFiles: Joi.array().optional().messages({
      "array.base": '"uploadFiles" should be an array if provided',
    }),
    tags: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"tags" should be an array of strings',
    }),
    linkStash: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStash" should be an array of strings',
    }),
    linkStitchlog: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStitchlog" should be an array of strings',
    }),
    isPublic: Joi.boolean().optional().messages({
      "boolean.base": '"isPublic" should be a type of boolean',
    }),
    addedValues: Joi.array().optional().messages({
      "array.base": '"addedValues" should be an array if provided',
    }),
    viewSizes: Joi.array().optional().messages({
      "array.base": '"viewSizes" should be an array if provided',
    }),
    imageTags: Joi.array().optional().messages({
      "array.base": '"imageTags" should be an array if provided',
    }),
    numberOfPrice: Joi.string().optional().messages({
      "string.base": '"numberOfPrice" should be a type of string',
    }),
  }),
};

export const updatePatternSchema = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": '"id" should be a type of string',
    }),
  }),
  body: Joi.object({
    name: Joi.string().optional().messages({
      "string.base": '"name" should be a type of string',
    }),

    imageUrls: Joi.array().items(Joi.string().uri()).optional().messages({
      "array.base": '"imageUrls" should be an array of valid URLs',
    }),

    brand: Joi.string().optional().messages({
      "string.base": '"brand" should be a type of string',
    }),

    patternType: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"patternType" should be an array of strings',
    }),

    format: Joi.string()
      .optional()
      .messages({
        "string.base": '"format" should be a type of string',
      }),

    skillLevel: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"skillLevel" should be an array of strings',
    }),

    sizeMake: Joi.string().optional().messages({
      "string.base": '"sizeMake" should be a type of string',
    }),

    connectStash: Joi.string().valid("Yes", "No").optional().messages({
      "string.base": '"connectStash" should be a type of string',
      "string.valid": '"connectStash" must be either "Yes" or "No"',
    }),

    isExist: Joi.string().valid("1", "2").optional().messages({
      "string.base": '"isExist" should be a type of string',
      "string.valid": '"isExist" must be either "1" or "2"',
    }),

    description: Joi.string().optional().messages({
      "string.base": '"description" should be a type of string',
    }),

    specification: Joi.string().optional().messages({
      "string.base": '"specification" should be a type of string',
    }),
    notionRequirement: Joi.string().optional().messages({
      "string.base": '"notionRequirement" should be a type of string',
    }),

    minSize: Joi.string().optional().messages({
      "string.base": '"minSize" should be a type of string',
    }),

    maxSize: Joi.string().optional().messages({
      "string.base": '"maxSize" should be a type of string',
    }),

    ageGroup: Joi.string().optional().messages({
      "string.base": '"ageGroup" should be a type of string',
    }),

    location: Joi.string().optional().messages({
      "string.base": '"location" should be a type of string',
    }),

    purchaseFrom: Joi.string().optional().messages({
      "string.base": '"purchaseFrom" should be a type of string',
    }),

    purchaseDate: Joi.string().optional().messages({
      "string.base": '"purchaseDate" should be a type of string',
    }),

    purchaseCost: Joi.number().optional().messages({
      "number.base": '"purchaseCost" should be a type of number',
    }),

    patternLink: Joi.string().optional().messages({
      "string.base": '"patternLink" should be a type of string',
    }),

    timesMade: Joi.number().optional().messages({
      "number.base": '"timesMade" should be a type of number',
    }),

    successRating: Joi.number().min(1).max(5).optional().messages({
      "number.base": '"successRating" should be a type of number',
      "number.min": '"successRating" should be at least 1',
      "number.max": '"successRating" should be at most 5',
    }),

    makeAgain: Joi.string().valid("1", "2").optional().messages({
      "string.base": '"makeAgain" should be a type of string',
      "string.valid": '"makeAgain" must be either "1" or "2"',
    }),

    difficultyRating: Joi.number().min(1).max(5).optional().messages({
      "number.base": '"difficultyRating" should be a type of number',
      "number.min": '"difficultyRating" should be at least 1',
      "number.max": '"difficultyRating" should be at most 5',
    }),

    notes: Joi.string().optional().messages({
      "string.base": '"notes" should be a type of string',
    }),

    modification: Joi.string().optional().messages({
      "string.base": '"modification" should be a type of string',
    }),
    sizeUnit: Joi.string().optional().messages({
      "string.base": '"sizeUnit" should be a type of string',
    }),
    categoryType: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"categoryType" should be an array of strings',
    }),
    specificStyle: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"specificStyle" should be an array of strings',
    }),
    isItemStitched: Joi.boolean().optional(),
    patternView: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"patternView" should be an array of strings',
    }),
    fabricRequirement: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"fabricRequirement" should be an array of strings',
    }),
    price: Joi.number().optional().messages({
      "string.base": '"notes" should be a type of number',
    }),
    priceUnit: Joi.string().optional().messages({
      "string.base": '"priceUnit" should be a type of string',
    }),
    uploadFiles: Joi.array().optional().messages({
      "array.base": '"uploadFiles" should be an array if provided',
    }),
    tags: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"tags" should be an array of strings',
    }),
    linkStash: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStash" should be an array of strings',
    }),
    linkStitchlog: Joi.array().items(Joi.string()).optional().messages({
      "array.base": '"linkStitchlog" should be an array of strings',
    }),
    isPublic: Joi.boolean().optional().messages({
      "boolean.base": '"isPublic" should be a type of boolean',
    }),
    addedValues: Joi.array().optional().messages({
      "array.base": '"addedValues" should be an array if provided',
    }),
    viewSizes: Joi.array().optional().messages({
      "array.base": '"viewSizes" should be an array if provided',
    }),
    imageTags: Joi.array().optional().messages({
      "array.base": '"imageTags" should be an array if provided',
    }),
    numberOfPrice: Joi.string().optional().messages({
      "string.base": '"numberOfPrice" should be a type of string',
    }),
  }),
};

export const deletePatternSchema = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": '"id" should be a type of string',
    }),
  }),
};

export const getPatternDetailsSchema = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.base": '"id" should be a type of string',
    }),
  }),
};
