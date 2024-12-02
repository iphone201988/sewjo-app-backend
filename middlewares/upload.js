import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).split("middlewares")[0];

const imageDir = path.join(__dirname, "view", "image");

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir;
    const extension = path.extname(file.originalname).toLowerCase();

    if (/^\.(png|jpg|jpeg|gif)$/.test(extension)) {
      dir = imageDir;
    } else {
      return cb(new Error("Invalid file type"));
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const trimmedOriginalName = file.originalname.trim().replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + trimmedOriginalName);
  },
});

const uploadSingle = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
}).single("file");

const uploadMultiple = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).array("files", 10);

const upload = {
  uploadSingle,
  uploadMultiple,
};

export default upload;
