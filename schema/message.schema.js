import Joi from "joi";
import mongoose from 'mongoose';

export const getMessagesSchema = {
  params: Joi.object({
    conversationId: Joi.string().required().messages({
      "string.base": '"conversationId" should be a type of string',
    }),
  }),
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1).optional().messages({
      "number.base": "Page must be a number",
      "number.integer": "Page must be an integer",
      "number.min": "Page must be at least 1",
    }),
    limit: Joi.number().integer().min(1).default(20).optional().messages({
      "number.base": "Limit must be a number",
      "number.integer": "Limit must be an integer",
      "number.min": "Limit must be at least 1",
    }),
  }),
};


export const sendMessageSchema = {
  body: Joi.object({
    sender_id: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('sender_id must be a valid ObjectId');
        }
        return value;
      })
      .required(),
      
    receiver_id: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('receiver_id must be a valid ObjectId');
        }
        return value;
      })
      .required(),
    
    conversation_id: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('conversation_id must be a valid ObjectId');
        }
        return value;
      })
      .required(),
    
    content: Joi.string().optional(),
    
    imageUrl: Joi.string()
      .uri()
      .optional()
      .allow(null),
  })
  .custom((value, helpers) => {
    if (!value.content && !value.imageUrl) {
      return helpers.message('Message must contain either content or an image.');
    }
    return value;
  })
};
