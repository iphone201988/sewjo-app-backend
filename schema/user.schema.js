import Joi from "joi";

export const signupSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    deviceType: Joi.string().required(),
    deviceToken: Joi.string().required(),
    displayName: Joi.string().optional(),
    profileImage: Joi.string().optional(),
    unit: Joi.string().optional(),
    currency: Joi.string().optional(),
    bio: Joi.string().optional(),
    city: Joi.string().max(150).optional(),
    country: Joi.string().optional(),
    bust: Joi.string().optional(),
    waist: Joi.string().optional(),
    hip: Joi.string().optional(),
    height: Joi.string().optional(),
    bodyDimensionsUnit: Joi.string().optional(),
    skillLevel: Joi.string().optional(),
    preferredSewingStyles: Joi.array().items(Joi.string()).optional(),
    preferredSewingTechniques: Joi.string().optional(),
  }),
};
export const signinSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    deviceType: Joi.string().required(),
    deviceToken: Joi.string().required(),
    profileImage: Joi.string().optional(),
    unit: Joi.string().optional(),
    currency: Joi.string().optional(),
    bio: Joi.string().optional(),
    city: Joi.string().max(150).optional(),
    country: Joi.string().optional(),
    bust: Joi.string().optional(),
    waist: Joi.string().optional(),
    hip: Joi.string().optional(),
    height: Joi.string().optional(),
    bodyDimensionsUnit: Joi.string().optional(),
    skillLevel: Joi.string().optional(),
    preferredSewingStyles: Joi.array().items(Joi.string()).optional(),
    preferredSewingTechniques: Joi.string().optional(),
  }),
};

export const socialLoginSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    deviceType: Joi.string().required(),
    deviceToken: Joi.string().required(),
    profileImage: Joi.string().optional(),
    unit: Joi.string().optional(),
    currency: Joi.string().optional(),
    bio: Joi.string().optional(),
    city: Joi.string().max(150).optional(),
    country: Joi.string().optional(),
    bust: Joi.string().optional(),
    waist: Joi.string().optional(),
    hip: Joi.string().optional(),
    height: Joi.string().optional(),
    bodyDimensionsUnit: Joi.string().optional(),
    skillLevel: Joi.string().optional(),
    preferredSewingStyles: Joi.array().items(Joi.string()).optional(),
    preferredSewingTechniques: Joi.string().optional(),
  }),
};

export const updateProfileSchema = {
  body: Joi.object({
    displayName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    profileImage: Joi.string().optional(),
    unit: Joi.string().optional(),
    currency: Joi.string().optional(),
    bio: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    bust: Joi.string().optional(),
    waist: Joi.string().optional(),
    hip: Joi.string().optional(),
    height: Joi.string().optional(),
    bodyDimensionsUnit: Joi.string().optional(),
    skillLevel: Joi.string().optional(),
    preferredSewingStyles: Joi.array().items(Joi.string()).optional(),
    sewingMachinesAndTools: Joi.string().optional(),
  }),
};