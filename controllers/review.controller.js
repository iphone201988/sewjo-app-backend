import mongoose from "mongoose";
import Review from "../models/review.model.js";

export const addRating = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productRef, comment, rating } = req.body;
    const review = await Review.create({
      comment,
      userRef: userId,
      productRef,
      rating
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
      { $match: { productRef: productRefObjectId } },
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
          comment: 1,
          productRef: 1,
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
      Review.countDocuments({ productRef: productRefObjectId }),
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