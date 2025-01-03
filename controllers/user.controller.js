import Fabric from "../models/fabric.model.js";
import History from "../models/updateHistory.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).split("controllers")[0];

const imageDir = path.join(__dirname, "view", "image");
const pdfDir = path.join(__dirname, "view", "pdf");

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

export const base64Upload = async (req, res, next) => {
  try {
    if (!req.body.file || !req.body.file.startsWith("data:")) {
      throw new Error("Invalid or missing Base64 data");
    }
    const base64Data = req.body.file.split(",")[1];
    const mimeType = req.body.file.split(";")[0].split(":")[1];
    const fileExtension = mime.extension(mimeType);
    if (!fileExtension) {
      throw new Error("Unsupported file type");
    }
    const fileName = `${uuidv4()}-${Date.now()}.${fileExtension}`;
    let filePath;
    if (mimeType.startsWith("image/")) {
      filePath = path.join(imageDir, fileName);
    } else if (mimeType === "application/pdf") {
      filePath = path.join(pdfDir, fileName);
    } else {
      throw new Error("Unsupported file type");
    }
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(filePath, buffer);
    const fileUrl = mimeType.startsWith("image/")
      ? `${process.env.BASE_URL}/image/${fileName}`
      : `${process.env.BASE_URL}/pdf/${fileName}`;
    res.status(200).json({
      success: true,
      message: `${
        mimeType.startsWith("image/") ? "Image" : "PDF"
      } uploaded successfully`,
      url: fileUrl,
    });
  } catch (error) {
    console.log("Error during Base64 upload:", error);
    next(error);
  }
};

export const singleUpload = async (req, res, next) => {
  try {
    console.log("here upload");
    if (req && req.file.filename == undefined)
      throw new Error("No file uploaded");
    console.log(req.file);
    res.status(200).json({
      success: true,
      message: "image upload successfully",
      url: `${process.env.BASE_URL}/image/${req.file.filename
        .trim()
        .replace(/\s+/g, "_")}`,
    });
  } catch (error) {
    console.log("error");
    next(error);
  }
};

export const multiUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0)
      throw new Error("No files uploaded");
    const urls = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      console.log(file);
      urls.push(
        `${process.env.BASE_URL}/image/${file.filename
          .trim()
          .replace(/\s+/g, "_")}`
      );
    }
    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      urls,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const {
    displayName,
    email,
    profileImage,
    unit,
    currency,
    bio,
    city,
    country,
    bust,
    waist,
    hip,
    height,
    bodyDimensionsUnit,
    skillLevel,
    preferredSewingStyles,
    sewingMachinesAndTools,
    isPrivate
  } = req.body;
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) return next(errorHandler(404, "User not found"));
    if (email && user.email !== email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return next(errorHandler(400, "Email already in use"));
    }
    if (email) {
      user.email = email;
    }
    if (displayName) {
      user.displayName = displayName;
    }
    if (profileImage) {
      user.profileImage = profileImage;
    }
    if (unit) {
      user.unit = unit;
    }
    if (currency) {
      user.currency = currency;
    }
    if (bio) {
      user.bio = bio;
    }
    if (city) {
      user.city = city;
    }
    if (country) {
      user.country = country;
    }
    if (bust) {
      user.bust = bust;
    }
    if (waist) {
      user.waist = waist;
    }
    if (hip) {
      user.hip = hip;
    }
    if (height) {
      user.height = height;
    }
    if (bodyDimensionsUnit) {
      user.bodyDimensionsUnit = bodyDimensionsUnit;
    }
    if (skillLevel) {
      user.skillLevel = skillLevel;
    }

    if (preferredSewingStyles) {
      user.preferredSewingStyles = preferredSewingStyles;
    }
    if (sewingMachinesAndTools) {
      user.sewingMachinesAndTools = sewingMachinesAndTools;
    }
    
    user.isPrivate = isPrivate;

    const restDetails = await user.save();

    restDetails.password = undefined;
    restDetails.deviceToken = undefined;
    restDetails.deviceType = undefined;
    restDetails.__v = undefined;
    restDetails.isDeleted = undefined;

    res.status(201).json({
      success: true,
      message: "User details updated successfully",
      user: restDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getFabricList = async (req, res, next) => {
  try {
    const fabricList = await Fabric.find({ userRef: req.userId });
    if (!fabricList) {
      return next(errorHandler(404, "Fabric not found"));
    }
    let message;
    if (fabricList.length === 0) {
      message = "No fabric found";
    } else {
      message = "Fabric list retrieved successfully";
    }
    res.status(200).json({
      success: true,
      message,
      fabricList,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHistory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { reasons } = req.body;
    const history = await History.findOne({ _id: id });
    if (!history) {
      return next(errorHandler(404, "History not found"));
    }
    if (reasons) {
      history.reasons = reasons;
    }
    await history.save();
    res.status(200).json({
      success: true,
      message: "History updated successfully",
      history,
    });
  } catch (error) {
    next(error);
  }
};


export const searchUsers = async (req, res, next) => {
  const searchQuery = req.query.query;
  if (!searchQuery) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const users = await User.find({
      displayName: { $regex: searchQuery, $options: "i" },
    })
      .select("-password")
      .sort({
        displayName: 1,
      })
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const viewProfile = async (req, res, next) => {
  const { user_id, profile_id } = req.params;

  console.log(user_id + "test" + profile_id);
  try {
    const userProfile = await User.findById(profile_id).select("-password");

    console.log(userProfile);
    if (!userProfile) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the logged-in user is following the profile
    //const isFollowing = userProfile.followers.includes(user_id); // Assuming `followers` is an array of user IDs in the User model

    /*if (!isFollowing) {
      return next(
        errorHandler(403, "You do not have permission to view this profile")
      ); // Handle access denial
    }*/

    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};

export const viewFollowers = async (req, res, next) => {
  const { user_id, profile_id } = req.params;

  try {
    const userProfile = await User.findById(profile_id).select("followers");

    if (!userProfile) {
      return next(errorHandler(404, "User not found"));
    }

    const followers = await Promise.all(
      userProfile.followers.map((followerId) => {
        return User.findById(followerId);
      })
    );
    let followerList = [];
    followers.map((follower) => {
      let followers = {};
      followers = {
        displayName: follower.displayName,
        profileImage: follower.profileImage,
        _id: follower._id,
      };
      followerList.push(followers);
    });

   res.status(200).json(followerList);
  }  catch (error) {
    next(error);
  }
};

export const viewFollowing = async (req, res, next) => {
  const { user_id, profile_id } = req.params;

  try {
    const userProfile = await User.findById(profile_id).select("following");

    if (!userProfile) {
      return next(errorHandler(404, "User not found"));
    }

    const following = await Promise.all(
      userProfile.following.map((followingId) => {
        return User
          .findById(followingId);
      })
    );
    let followingList = [];
    following.map((follow) => {
      let following = {};
      following = {
        displayName: follow.displayName,
        profileImage: follow.profileImage,
        _id: follow._id,
      };
      followingList.push(following);
    });

    res.status(200).json(followingList);
  } catch (error) {
    next(error);
  }
};


export const getFollowers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const followers = await Promise.all(
      user.followers.map((followerId) => {
        return User.findById(followerId);
      })
    );
    let followerList = [];
    followers.map((follower) => {
      let followers = {};
      followers = {
        displayName: follower.displayName,
        profileImage: follower.profileImage,
        _id: follower._id,
      };
      followerList.push(followers);
    });
    res.status(200).json(followerList);
  } catch (error) {
    next(error);
  }
};



export const getFollowing = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    let following = {};
    following = await Promise.all(
      user.following.map((followingId) => {
        return User.findById(followingId);
      })
    );
    let usersFollowed = [];
    following.map((follow) => {
      let userFollowed = {};
      userFollowed = {
        displayName: follow.displayName,
        profileImage: follow.profileImage,
        _id: follow._id,
      };
     usersFollowed.push(userFollowed);
    });
    res.status(200).json(usersFollowed);
  } catch (error) {
    next(error);
  }
};



export const removeFollower = async (req, res, next) => {
  if (req.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const otherUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId) && !otherUser.following.includes(req.params.id)) {
        return next(errorHandler(400, "You are not being followed by this user"));
      }
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await otherUser.updateOne({ $pull: { following: req.params.id } });
      const updatedUser = await User.findById(req.params.id);
      res.status(200).json({
        message: "You have removed this follower",
        updatedFollowers: updatedUser.followers,
        updatedFollowing: updatedUser.following
      });

    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only remove followers who follow you"));
  }
};


export const unfollowUser = async (req, res, next) => {
  if (req.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const otherUser = await User.findById(req.body.userId);
      if (!user.following.includes(req.body.userId) && !otherUser.followers.includes(req.params.id)) {
        return next(errorHandler(400, "You do not follow this user"));
      }
      await user.updateOne({ $pull: { following: req.body.userId } });
      await otherUser.updateOne({ $pull: { followers: req.params.id } });
      const updatedUser = await User.findById(req.params.id);
      res.status(200).json({
        message: "You have unfollowed this user",
        updatedFollowing: updatedUser.following,
        updatedFollowers: updatedUser.followers
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only unfollow users you follow"));
  }
}


export const getSuggestedUsers = async (req, res, next) => {
try {
  const currentUser = await User.findById(req.userId);

  const preferredSewingStyles = currentUser.preferredSewingStyles;
  const following = currentUser.following.map((id) => new mongoose.Types.ObjectId(id));

  let suggestedUsers;

  if(preferredSewingStyles && preferredSewingStyles.length > 0) {
    suggestedUsers = await User.aggregate([
      {
        $match: {
          _id: {
            $nin: [...following, currentUser._id],
          },
          preferredSewingStyles: {
            $in: preferredSewingStyles,
          },
        },
      },
      {
        $project: {
          _id: 1,
          displayName: 1,
          profileImage: 1,
        },
      },
    ])
    console.log(suggestedUsers);
  }
  if (!suggestedUsers || suggestedUsers.length === 0) {
    suggestedUsers = await User.aggregate([
    {
      $match: {
        _id: { 
          $nin: [...following, currentUser._id],
        },
      },
    },
    {
      $project: {
        _id: 1,
        displayName: 1,
        profileImage: 1,
      },
    },
  ]);
  }
  console.log(suggestedUsers);
  res.status(200).json(suggestedUsers);
} catch (error) {
  next(error);
}
};



export const followOtherUser = async (req, res, next) => {
if (req.userId === req.params.id) {
  try {
    const user = await User.findById(req.params.id);
    const otherUser = await User.findById(req.body.userId);
    if (user.following.includes(req.body.userId) && otherUser.followers.includes(req.params.id)) {
      return next(errorHandler(400, "You already follow this user"));
    }
    await user.updateOne({ $push: { following: req.body.userId } });
    await otherUser.updateOne({ $push: { followers: req.params.id } });
    res.status(200).json("You are now following this user!");
  } catch (error) {
    next(error);
  }
} else {
  return next(errorHandler(401, "You can only follow from your own account"));
}
};



export const getUserById = async(req, res, next) => {
const { user_id } = req.params;
try {
  const targetUser = await User.findById(user_id)

  if (!targetUser) {
    return res.status(404).json({ message: "User not found" }); 
  }

  res.status(200).json(targetUser); 
} catch(e) {
  console.error("Error fetching user by ID:", error);
  res.status(500).json({ message: "Server error" });
}
}

