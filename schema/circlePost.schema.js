import Joi from "joi";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createCirclePostSchema = {
  body: Joi.object({
    user: Joi.string().regex(objectIdRegex).required().messages({
      "string.base": "Invalid user",
      "string.pattern.base": "User must be a valid ObjectId",
    }),
    circle: Joi.string().regex(objectIdRegex).required().messages({
      "string.base": "Invalid circle",
      "string.pattern.base": "Circle must be a valid ObjectId",
    }),
    title: Joi.string().max(100).optional().messages({
      "string.max": "Title is too long",
      "string.base": "Title must be a string",
    }),
    content: Joi.string().max(1000).optional().messages({
      "string.max": "Content is too long",
      "string.base": "Content must be a string",
    }),
    theme: Joi.string()
      .valid(
        "Question",
        "Recommendation",
        "Help Needed",
        "Tutorial/Guide",
        "Showcase/Finished Project",
        "In Progress",
        "Review",
        "Event/Meetup",
        "Discussion",
        "Poll/Vote"
      )
      .required()
      .messages({
        "string.base": "Theme must be a string",
        "any.only":
          "Theme must be one of the following: Question, Recommendation, Help Needed, Tutorial/Guide, Showcase/Finished Project, In Progress, Review, Event/Meetup, Discussion, Poll/Vote",
        "any.required": "Theme is required",
      }),
    linkedItems: Joi.object({
      fabric: Joi.string().max(150).optional().messages({
        "string.base": "Fabric must be a string",
        "string.max": "Fabric should not exceed 150 characters",
      }),
      pattern: Joi.string().max(150).optional().messages({
        "string.base": "Pattern must be a string",
        "string.max": "Pattern should not exceed 150 characters",
      }),
    }).optional(),
    videoUrl: Joi.string().uri().optional().messages({
      "string.base": "Video URL must be a string",
      "string.uri": "Video URL must be a valid URI",
    }),
    images: Joi.array()
      .items(
        Joi.string().uri().messages({
          "string.base": "Each image URL must be a string",
          "string.uri": "Each image URL must be a valid URI",
        })
      )
      .optional()
      .messages({
        "array.base": "Images must be an array of strings",
      }),
  }),
};

export const updateCirclePostSchema = {
   params: Joi.object({
    postId: Joi.string().required(),
     }),
    body: Joi.object({
        title: Joi.string().max(100).optional().messages({
        "string.max": "Title is too long",
        "string.base": "Title must be a string",
      }),
      content: Joi.string().max(1000).optional().messages({
        "string.max": "Content is too long",
        "string.base": "Content must be a string",
      }),
      theme: Joi.string()
      .valid(
        "Question",
        "Recommendation",
        "Help Needed",
        "Tutorial/Guide",
        "Showcase/Finished Project",
        "In Progress",
        "Review",
        "Event/Meetup",
        "Discussion",
        "Poll/Vote"
      )
      .optional()
      .messages({
        "string.base": "Theme must be a string",
        "any.only":
          "Theme must be one of the following: Question, Recommendation, Help Needed, Tutorial/Guide, Showcase/Finished Project, In Progress, Review, Event/Meetup, Discussion, Poll/Vote",
      }),

      linkedItems: Joi.object({
        fabric: Joi.string().max(150).optional().messages({
          "string.base": "Fabric must be a string",
          "string.max": "Fabric should not exceed 150 characters",
        }),
        pattern: Joi.string().max(150).optional().messages({
          "string.base": "Pattern must be a string",
          "string.max": "Pattern should not exceed 150 characters",
        }),
      }).optional(),
      videoUrl: Joi.string().uri().optional().messages({
        "string.base": "Video URL must be a string",
        "string.uri": "Video URL must be a valid URI",
      }),
      images: Joi.array().optional()
        .items(
          Joi.string().uri().optional().messages({
            "string.base": "Each image URL must be a string",
            "string.uri": "Each image URL must be a valid URI",
          })
        )
        .optional()
        .messages({
          "array.base": "Images must be an array of strings",
        }),
    })
}

export const deleteCirclePostSchema = {
  params: Joi.object({
    postId: Joi.string().regex(objectIdRegex).required().messages({
        "string.base": "Invalid user",
        "string.pattern.base": "User must be a valid ObjectId",
      }) ,
    userId: Joi.string().regex(objectIdRegex).required().messages({
        "string.base": "Invalid user",
        "string.pattern.base": "User must be a valid ObjectId",
      }),
  }),
};

export const getPostsByCircleSchema = {
    params: Joi.object({
        circleId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid circleId",
            "string.pattern.base": "CircleId must be a valid ObjectId",
        })
    }),
    query: Joi.object({
        theme:Joi.string()
        .valid(
          "Question",
          "Recommendation",
          "Help Needed",
          "Tutorial/Guide",
          "Showcase/Finished Project",
          "In Progress",
          "Review",
          "Event/Meetup",
          "Discussion",
          "Poll/Vote"
        )
        .optional()
        .messages({
          "string.base": "Theme must be a string",
          "any.only":
            "Theme must be one of the following: Question, Recommendation, Help Needed, Tutorial/Guide, Showcase/Finished Project, In Progress, Review, Event/Meetup, Discussion, Poll/Vote",
        }),
        page:Joi.number().integer().min(1).default(1).optional().messages({
            "number.base": "Page must be a number",
            "number.integer": "Page must be an integer",
            "number.min": "Page must be at least 1",
        }), 
        limit:Joi.number().integer().min(1).default(10).optional().messages({
            "number.base": "Limit must be a number",
            "number.integer": "Limit must be an integer",
            "number.min": "Limit must be at least 1",
        })
    })
}

export const getPostsByUserSchema = {
    params: Joi.object({
        userId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid userId",
            "string.pattern.base": "UserId must be a valid ObjectId",
        })
    }),
    query: Joi.object({
        page:Joi.number().integer().min(1).optional().messages({
            "number.base": "Page must be a number",
            "number.integer": "Page must be an integer",
            "number.min": "Page must be at least 1",
        }), 
        limit:Joi.number().integer().min(1).max(10).optional().messages({
            "number.base": "Limit must be a number",
            "number.integer": "Limit must be an integer",
            "number.min": "Limit must be at least 1",
            "number.max": "Limit must be at most 10",
        })
    })
}
export const getPostWithCommentsAndRepliesSchema = {
    params: Joi.object({
        postId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    })
}

export const likePostSchema = {
    params: Joi.object({
        postId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    }),
    body: Joi.object({
        userId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid userId",
            "string.pattern.base": "UserId must be a valid ObjectId",
        })
    })
}

export const unlikePostSchema = {
    params: Joi.object({
        postId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid postId",
            "string.pattern.base": "PostId must be a valid ObjectId",
        })
    }),
    body: Joi.object({
        userId: Joi.string().regex(objectIdRegex).required().messages({
            "string.base": "Invalid userId",
            "string.pattern.base": "UserId must be a valid ObjectId",
        })
    })
}