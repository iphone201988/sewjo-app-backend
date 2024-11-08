import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the file's path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).split("middlewares")[0];

// Define the image directory path
const imageDir = path.join(__dirname, "view", "image");

// Check if the directory exists, if not, create it
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true }); // Creates the directory and its parent directories if necessary
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir;
    const extension = path.extname(file.originalname).toLowerCase();

    // Check file type, allow image types only
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

// Single file upload configuration
const uploadSingle = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single("file");

// Multiple files upload configuration
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
