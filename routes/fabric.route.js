// import express from "express";
// import { createFabricStash, getFabricDetails, updateFabricDetails } from "../controllers/fabric.controller.js";
// import { verifyToken } from "../utils/verifyUser.js";

// const router = express.Router();

// router.post("/create", verifyToken, createFabricStash);
// router.get("/:id/getdetails", getFabricDetails);
// router.put("/:id/update", verifyToken, updateFabricDetails);

// export default router;

import express from "express";
import {
  createFabricStash,
  getAllFabric,
  getFabricDetails,
  updateFabricDetails,
} from "../controllers/fabric.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add", createFabricStash);
router.get("/getFabric", getAllFabric);
router.get("/getFabric/:id", getFabricDetails);
router.put("/:id", updateFabricDetails);
export default router;

