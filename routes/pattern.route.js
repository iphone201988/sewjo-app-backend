import express from "express";
import {
  createPattern,
  deletePattern,
  getAllPattern,
  getPatternDetails,
  GlobalPatternSearch,
  updatePattern,
  updateSeachCount,
} from "../controllers/pattern.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import validate from "../middlewares/validate.js";
import {
  createPatternSchema,
  deletePatternSchema,
  getPatternDetailsSchema,
  updatePatternSchema,
} from "../schema/pattern.schema.js";

const router = express.Router();

router.post(
  "/create-pattern",
  validate(createPatternSchema),
  verifyToken,
  createPattern
);
router.get("/get-patterns", verifyToken, getAllPattern);
router.get(
  "/get-pattern/:id",
  validate(getPatternDetailsSchema),
  verifyToken,
  getPatternDetails
);
router.put(
  "/update-pattern/:id",
  validate(updatePatternSchema),
  verifyToken,
  updatePattern
);
router.delete(
  "/delete-pattern/:id",
  validate(deletePatternSchema),
  verifyToken,
  deletePattern
);

router.put("/search-count-update/:id",verifyToken,updateSeachCount);

router.get("/global-pattern-search", verifyToken, GlobalPatternSearch);

export default router;
