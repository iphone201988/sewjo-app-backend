import mongoose from "mongoose";
import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const addRating = async (req, res, next) => {
  try {
    const userId = req.userId;
    const review = await Review.create({
      ...req.body,
      userRef: userId,
    });
    res.status(200).json({
      success: true,
      message: "Rating added successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

export const getRatings = async (req, res, next) => {
  try {
    const productRef = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const productRefObjectId = mongoose.Types.ObjectId.isValid(productRef)
      ? new mongoose.Types.ObjectId(productRef)
      : productRef;

    const reviewsAggregation = Review.aggregate([
      { $match: { productRef: productRefObjectId , isPublic:true } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "userRef",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      //   {
      //     $lookup: {
      //       from: "fabrics",
      //       localField: "productRef",
      //       foreignField: "_id",
      //       as: "fabricDetails",
      //     },
      //   },
      //   { $addFields: { fabricDetails: { $ifNull: ["$fabricDetails", []] } } },
      //   {
      //     $lookup: {
      //       from: "supplies",
      //       localField: "productRef",
      //       foreignField: "_id",
      //       as: "supplyDetails",
      //     },
      //   },
      //   { $addFields: { supplyDetails: { $ifNull: ["$supplyDetails", []] } } },
      //   {
      //     $lookup: {
      //       from: "patterns",
      //       localField: "productRef",
      //       foreignField: "_id",
      //       as: "patternDetails",
      //     },
      //   },
      //   { $addFields: { patternDetails: { $ifNull: ["$patternDetails", []] } } },
      //   {
      //     $addFields: {
      //       productDetails: {
      //         $cond: {
      //           if: { $gt: [{ $size: "$fabricDetails" }, 0] },
      //           then: "$fabricDetails",
      //           else: {
      //             $cond: {
      //               if: { $gt: [{ $size: "$supplyDetails" }, 0] },
      //               then: "$supplyDetails",
      //               else: "$patternDetails",
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },

      {
        $project: {
          _id: 1,
          rating: 1,
          title: 1,
          description: 1,
          size: 1,
          fabricUse: 1,
          imageUrls: 1,
          isPublic: 1,
          productRef: 1,
          notWorked: 1,
          worked: 1,
          like:1,
          disLike:1,
          createdAt: 1,
          updatedAt: 1,
          "userDetails._id": 1,
          "userDetails.displayName": 1,
          "userDetails.email": 1,
          "userDetails.profileImage": 1,
          //   productDetails: 1,
        },
      },
    ]);

    const [reviews, totalReviews, avgRating] = await Promise.all([
      reviewsAggregation,
      Review.countDocuments({ productRef: productRefObjectId,isPublic:true }),
      Review.aggregate([
        { $match: { productRef: productRefObjectId } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]),
    ]);

    const averageRating = avgRating.length > 0 ? avgRating[0].avgRating : 0;
    const totalPages = Math.ceil(totalReviews / limit);

    let message;
    if (reviews.length === 0) {
      message = "No reviews found for this product";
    } else {
      message = "Reviews found for this product";
    }

    res.status(200).json({
      success: true,
      message,
      reviews,
      page,
      limit,
      totalReviews,
      totalPages,
      averageRating,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { rating, title, description, size, fabricUse, imageUrls, isPublic, notWorked, worked } = req.body;
    const review = await Review.findById(id);
    if (!review) {
      return next(errorHandler(404, "Review not found"));
    }
    if (req.userId!== review.userRef) {
      return next(errorHandler(401, "You can only update your own reviews!"));
    }
    if(rating){
      review.rating = rating;
    }
    if(title){
      review.title = title;
    }
    if(description){
      review.description = description;
    }
    if(size){
      review.size = size;
    }
    if(fabricUse){
      review.fabricUse = fabricUse;
    }
    if(imageUrls){
      review.imageUrls = imageUrls;
    }

    review.isPublic = isPublic;
    
    if(notWorked){
      review.notWorked = notWorked;
    }
    if(worked){
      review.worked = worked;
    }
    await review.save();
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });   
  } catch (error) {
    next(error);
  }
}

export const deleteRating = async (req, res, next) => {
  try {
    const id = req.params.id;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return next(errorHandler(404, "Review not found!"));
    }
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};


export const LikeUnlikeReview = async(req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const review = await Review.findById(id);
    
    if (!review) {
      return next(errorHandler(404, "Review not found!"));
    }
    let message;
    if (review.like.includes(userId)) {
      review.like = review.like.filter((user) => user.toString() !== userId.toString());
      message = "Unliked successfully";
    } else {
      review.like.push(userId);
      message = "Liked successfully";
    } 
    if (review.disLike.includes(userId)) {
      review.disLike = review.disLike.filter((user) => user.toString() !== userId.toString());
    }
    await review.save();
    res.status(200).json({
      success: true,
      message,
      Like: review.like,
      Dislike: review.disLike,
    });
  } catch (error) {
    next(error);
  }
};

export const dislikeUndislike = async(req,res,next)=>{
  try {
    const id = req.params.id;
    const userId = req.userId;
    const review = await Review.findById(id);
    
    if (!review) {
      return next(errorHandler(404, "Review not found!"));
    }
    let message;
    if (review.disLike.includes(userId)) {
      review.disLike = review.disLike.filter((user) => user.toString() !== userId.toString());
      message = "disLike removed successfully";
    } else {
      review.disLike.push(userId);
      message = "disLike successfully";
    } 
    if (review.like.includes(userId)) {
      review.like = review.like.filter((user) => user.toString() !== userId.toString());
    }
    await review.save();
    res.status(200).json({
      success: true,
      message,
      Like: review.like,
      Dislike: review.disLike,
    }); 
  } catch (error) {
    next(error);  
  }
}


export const likeDislike = async (req, res, next) => {
  try {
    const { type } = req.body;

    const id = req.params.id;

    const userId = req.userId;

    if (type !== 'like' && type !== 'dislike') {
      return next(errorHandler(400, `Invalid type. It must be "like" or "dislike". `));
    }

    const review = await Review.findById(id);
    
    if (!review) {
      return next(errorHandler(404, 'Review not found!'));
    }

    let message;
    if (type === 'like') {
      if (review.like.includes(userId)) {
        review.like = review.like.filter(user => user.toString() !== userId.toString());
        message = 'Unliked successfully';
      } else {
        review.like.push(userId);
        message = 'Liked successfully';
      }
      if (review.disLike.includes(userId)) {
        review.disLike = review.disLike.filter(user => user.toString() !== userId.toString());
      }
    } else if (type === 'dislike') {
      if (review.disLike.includes(userId)) {
        review.disLike = review.disLike.filter(user => user.toString() !== userId.toString());
        message = 'Dislike removed successfully';
      } else {
        review.disLike.push(userId);
        message = 'Disliked successfully';
      }
      if (review.like.includes(userId)) {
        review.like = review.like.filter(user => user.toString() !== userId.toString());
      }
    }
    await review.save();
    res.status(200).json({
      success: true,
      message,
      Like: review.like,
      Dislike: review.disLike,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


