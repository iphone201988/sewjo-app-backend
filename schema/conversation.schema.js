import Joi from 'joi';

// Regex for validating MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

/**
 * Custom Joi validation for MongoDB ObjectId
 * @param {string} value
 * @param {object} helpers
 * @returns {string|object} - Returns value if valid, or a Joi error message
 */
const validateObjectId = (value, helpers) => {
  if (!objectIdRegex.test(value)) {
    return helpers.message('"{{#label}}" must be a valid ObjectId');
  }
  return value;
};

// Common error messages
const createRequiredMessage = field => `"${field}" is required`;
const createStringLengthMessage = (field, length) => `"${field}" should be ${length} characters long`;

/**
 * Schema for creating a conversation
 */
export const createConversationSchema = {
  body: Joi.object({
    senderId: Joi.string()
      .custom(validateObjectId)
      .required()
      .messages({
        'any.required': createRequiredMessage('senderId'),
      }),
    
    receiverId: Joi.string()
      .custom(validateObjectId)
      .required()
      .messages({
        'any.required': createRequiredMessage('receiverId'),
      }),
  }),
};

/**
 * Schema for retrieving conversations by user ID
 */
export const getConversationsSchema = {
  params: Joi.object({
    userId: Joi.string()
      .custom(validateObjectId)
      .required()
      .messages({
        'any.required': createRequiredMessage('userId'),
      }),
  }),
};

/**
 * Schema for retrieving messages in a conversation by conversation ID
 */
export const getConversationMessagesSchema = {
  params: Joi.object({
    conversationId: Joi.string()
      .custom(validateObjectId)
      .required()
      .messages({
        'any.required': createRequiredMessage('conversationId'),
      }),
  }),
};

/**
 * Schema for marking messages as read
 */
export const markMessagesAsReadSchema = {
  params: Joi.object({
    conversationId: Joi.string()
      .length(24)
      .required()
      .messages({
        'string.base': '"conversationId" should be a string',
        'string.length': createStringLengthMessage('conversationId', 24),
        'any.required': createRequiredMessage('conversationId'),
      }),
  }),
  body: Joi.object({
    userId: Joi.string()
      .length(24)
      .required()
      .messages({
        'string.base': '"userId" should be a string',
        'string.length': createStringLengthMessage('userId', 24),
        'any.required': createRequiredMessage('userId'),
      }),
  }),
};

/**
 * Schema for generating a conversation ID from sender and receiver IDs
 */
export const getConversationIdSchema = {
  body: Joi.object({
    senderId: Joi.string()
      .length(24)
      .required()
      .messages({
        'string.base': '"senderId" should be a string',
        'string.length': createStringLengthMessage('senderId', 24),
        'any.required': createRequiredMessage('senderId'),
      }),

    receiverId: Joi.string()
      .length(24)
      .required()
      .messages({
        'string.base': '"receiverId" should be a string',
        'string.length': createStringLengthMessage('receiverId', 24),
        'any.required': createRequiredMessage('receiverId'),
      }),
  }),
};

/**
 * Schema for hiding a conversation
 */
export const hideConversationSchema = {
  body: Joi.object({
    conversationId: Joi.string()
      .length(24)
      .required()
      .messages({
        'string.base': '"conversationId" should be a string',
        'string.length': createStringLengthMessage('conversationId', 24),
        'any.required': createRequiredMessage('conversationId'),
      }),

    userId: Joi.string()
      .length(24)
      .required()
      .messages({
        'string.base': '"userId" should be a string',
        'string.length': createStringLengthMessage('userId', 24),
        'any.required': createRequiredMessage('userId'),
      }),
  }),
};
