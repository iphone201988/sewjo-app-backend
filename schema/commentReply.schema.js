import Joi from "joi";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;


export const createCommentReplySchema = {
body: Joi.object({
    commentId: Joi.string().regex(objectIdRegex).required().messages({
      "string.base": "Invalid commentId",
      "string.pattern.base": "commentId must be a valid ObjectId",
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
}

export const updateCommentReplySchema = {
     param: Joi.object({
        replyId:Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid replyId",
                "string.pattern.base": "replyId must be a valid ObjectId",
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

export const deleteCommentReplySchema = {
    param: Joi.object({
        replyId:Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid replyId",
                "string.pattern.base": "replyId must be a valid ObjectId",
    }),
    userId:Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid userId",
                "string.pattern.base": "userId must be a valid ObjectId",
        })
    }), 
}
export const getRepliesByCommentSchema = {
    param: Joi.object({
        commentId: Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid commentId",
                "string.pattern.base": "commentId must be a valid ObjectId",
        })
    })
}
export const likeCommentReplySchema = {
    param: Joi.object({
        replyId: Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid replyId",
                "string.pattern.base": "replyId must be a valid ObjectId",
        })
    }),
    body: Joi.object({
        userId: Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid userId",
                "string.pattern.base": "userId must be a valid ObjectId",
        })
    })
}

export const unlikeCommentReplySchema = {
    param: Joi.object({
        replyId: Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid replyId",
                "string.pattern.base": "replyId must be a valid ObjectId",
        })
    }),
    body: Joi.object({
        userId: Joi.string().regex(objectIdRegex).required().messages({
                "string.base": "Invalid userId",
                "string.pattern.base": "userId must be a valid ObjectId",
        })
    })
}