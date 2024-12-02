import express from "express";
import upload from "../middlewares/upload.js";
import { base64Upload, multiUpload, singleUpload } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/file", upload.uploadSingle, singleUpload);
router.post("/multifile", upload.uploadMultiple, multiUpload);
router.post("/image",base64Upload);

export default router;
