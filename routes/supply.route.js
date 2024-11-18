import express from "express";
import {
  createSupply,
  getSupplyDetails,
  updateSupplyDetails,
  getAllSupplies,
  deleteSupply,
} from "../controllers/supply.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";
import validate from "../middlewares/validate.js";
import {
  createSupplySchema,
  deletesupplySchema,
  getDetailsSchema,
  updateSupplySchema,
} from "../schema/supply.schema.js";

const router = express.Router();

router.post("/add", validate(createSupplySchema), verifyToken, createSupply);

router.get("/getSupply", verifyToken, getAllSupplies);

router.get(
  "/getSupply/:id",
  validate(getDetailsSchema),
  verifyToken,
  getSupplyDetails
);

router.put(
  "/:id",
  validate(updateSupplySchema),
  verifyToken,
  updateSupplyDetails
);

router.delete("/:id", validate(deletesupplySchema), verifyToken, deleteSupply);

export default router;
