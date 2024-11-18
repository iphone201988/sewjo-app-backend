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
  deleteFabric,
  getAllFabric,
  getFabricDetails,
  updateFabricDetails,
} from "../controllers/fabric.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import validate from "../middlewares/validate.js";
import {
  createFabricSchema,
  deleteFabricSchema,
  getDetailsSchema,
  updateFabricSchema,
} from "../schema/fabric.schema.js";

const router = express.Router();

router.post(
  "/add",
  validate(createFabricSchema),
  verifyToken,
  createFabricStash
);
router.get("/getFabric", verifyToken, getAllFabric);
router.get(
  "/getFabric/:id",
  validate(getDetailsSchema),
  verifyToken,
  getFabricDetails
);
router.put(
  "/:id",
  validate(updateFabricSchema),
  verifyToken,
  updateFabricDetails
);
router.delete("/:id", validate(deleteFabricSchema), verifyToken, deleteFabric);

export default router;
