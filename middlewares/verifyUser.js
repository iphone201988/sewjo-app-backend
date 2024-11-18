import { errorHandler } from "../utils/error.js";
import { validateToken } from "../helper/index.js";
import User from "../models/user.model.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) return next(errorHandler(401, 'Unauthorized'));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, 'Forbidden'));
//     req.user = user;
//     next();
//   });
// };

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(errorHandler(401, "Authorization header is missing"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(errorHandler(401, "Token is missing"));
    }
    const decoded = validateToken(token);
    if (!decoded) {
      return next(errorHandler(400, "Invalid token payload"));
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(errorHandler(400, "User not found for token payload"));
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};
