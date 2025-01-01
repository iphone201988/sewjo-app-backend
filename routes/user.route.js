import express from "express";
import { followOtherUser, getFabricList, getFollowers, getFollowing, getSuggestedUsers, getUserById, removeFollower, searchUsers, unfollowUser, updateHistory, updateUser, viewFollowers, viewFollowing, viewProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import validate from "../middlewares/validate.js";
import { updateProfileSchema } from "../schema/user.schema.js";


const router = express.Router();

router.put("/update",validate(updateProfileSchema), verifyToken, updateUser);
router.get("/fabriclist", verifyToken, getFabricList);
router.put("/update-history/:id",verifyToken, updateHistory);

router.get("/search", verifyToken, searchUsers);
router.get("/:user_id/viewProfile/:profile_id", verifyToken, viewProfile);
router.get("/:user_id/viewFollowers/:profile_id", verifyToken, viewFollowers);
router.get("/:user_id/viewFollowing/:profile_id", verifyToken, viewFollowing);
router.get("/:id/getFollowers", verifyToken, getFollowers);
router.post("/:id/removeFollower", verifyToken, removeFollower);
router.post("/:id/unfollow", verifyToken, unfollowUser);
router.get("/:id/getFollowing", verifyToken, getFollowing);
router.get("/:id/suggestedUsers", verifyToken, getSuggestedUsers);
router.post("/:id/follow", verifyToken, followOtherUser);
router.get("/getUserById/:user_id", verifyToken, getUserById);


export default router;
