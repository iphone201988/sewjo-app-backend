import Joi from "joi";

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

export const getCircleWithOwnerSchema = {
  params: Joi.object({
    circleId: Joi.string().required(),
  }),
};

export const createCircleSchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      "string.base": '"name" should be a type of string',
      "string.empty": '"name" cannot be empty',
    }),
    description: Joi.string().optional().max(300).messages({
      "string.base": '"description" should be a type of string',
      "string.empty": '"description" cannot be empty',
      "string.max": '"description" should not exceed 300 characters',
    }),
    privacy: Joi.string().optional().valid("Public", "Private").messages({
      "string.base": '"privacy" should be a type of string',
      "string.empty": '"privacy" cannot be empty',
      "any.only": '"privacy" should be either "Public" or "Private"',
    }),
    owner: Joi.string().regex(objectIdRegex).required().messages({
      "string.base": '"owner" should be a type of string',
      "string.empty": '"owner" cannot be empty',
      "string.pattern.base": '"owner" should be a valid MongoDB ObjectId',
      "any.required": '"owner" is required',
    }),
  }),
};

export const updateCircleSchema = {
  params: Joi.object({
    circleId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().optional().messages({
      "string.base": '"name" should be a type of string',
      "string.empty": '"name" cannot be empty',
    }),
    description: Joi.string().optional().max(300).messages({
      "string.base": '"description" should be a type of string',
      "string.empty": '"description" cannot be empty',
      "string.max": '"description" should not exceed 300 characters',
    }),
    privacy: Joi.string().optional().valid("Public", "Private").messages({
      "string.base": '"privacy" should be a type of string',
      "string.empty": '"privacy" cannot be empty',
      "any.only": '"privacy" should be either "Public" or "Private"',
    }),
    owner: Joi.string().regex(objectIdRegex).optional().messages({
      "string.base": '"owner" should be a type of string',
      "string.empty": '"owner" cannot be empty',
      "string.pattern.base": '"owner" should be a valid MongoDB ObjectId',
    }),
  }),
};

export const addMemeberToCircleSchema = {
  params: Joi.object({
    circleId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

export const removeMemeberFromCircleSchema = {
  params: Joi.object({
    circleId: Joi.string().required(),
    userId: Joi.string().required(),
    requesterId: Joi.string().required(),
  }),
};

export const getCircleMembersSchema = {
  params: Joi.object({
    circleId: Joi.string().required(),
  }),
};

export const getUserFromCircleSchema = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
};

export const getAllCircleWithOwnerSchema = {
  query: Joi.object({
    page: Joi.number().optional().default(1).messages({
      "number.base": '"page" should be a type of number',
    }),
    limit: Joi.number().optional().default(10).messages({
      "number.base": '"limit" should be a type of number',
    }),
    search: Joi.string().optional().messages({
      "string.base": '"search" should be a type of string',
    }),
  }),
};

export const getCircleWithMembersAndOwnerSchema = {
  params: Joi.object({
    circleId: Joi.string().required(),
  }),
};
