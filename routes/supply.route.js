import express from 'express';
import { createSupply, getSupplyDetails, updateSupplyDetails, getAllSupplies } from '../controllers/supply.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/add', createSupply);

router.get('/getSupply', getAllSupplies);

router.get('/getSupply/:id', getSupplyDetails);

router.put('/:id', /* verifyToken,  */updateSupplyDetails);

export default router;