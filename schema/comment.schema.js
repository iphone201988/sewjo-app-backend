import Joi from "joi";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createCommentSchema = {
  body: Joi.object({
    postId: Joi.string().regex(objectIdRegex).required().messages({
      "string.base": "Invalid postId",
      "string.pattern.base": "PostId must be a valid ObjectId",
    }),
    user: Joi.string().regex(objectIdRegex).required().messages({
      "string.base": "Invalid postId",
      "string.pattern.base": "PostId must be a valid ObjectId",
    }),
    content: Joi.string().optional().max(500).messages({
      "string.max": "content is too long",
      "string.base": "content must be a string",
    }),
  }),
};
export const updateCommentSchema = {
    param: Joi.object({
        commentId:Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    }),
    body: Joi.object({
        content: Joi.string().optional().max(500).messages({
            "string.max": "content is too long",
            "string.base": "content must be a string",
        }),
        user:Joi.string().regex(objectIdRegex).optional().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    })
}

export const deleteCommentSchema = {
    param: Joi.object({
        commentId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        }),
        userId:Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    })
}

export const getCommentsByPostSchema = {
    param: Joi.object({
        postId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    })
}

export const likeCommentSchema = {
    param: Joi.object({
        commentId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    }),
    body: Joi.object({
        userId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    })
}

export const unlikeCommentSchema = {
    param: Joi.object({
        commentId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    }),
    body: Joi.object({
        userId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    })
}
