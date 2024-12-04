import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Supply from "../models/supply.model.js";
import Fabric from "../models/fabric.model.js";
import Pattern from "../models/pattern.model.js";

export const encryptPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign(payload, secretKey, { expiresIn: "30d" });
};

export const validateToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const generateRandomString = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
};

export const generateOtp = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const fetchLinkedData = async (linkIds) => {
  const supplyIds = [];
  const fabricIds = [];
  const patternIds = [];

  linkIds.forEach(id => {
    supplyIds.push(id);
    fabricIds.push(id);
    patternIds.push(id);
  });

  const [linkedSupplies, linkedFabrics, linkedPatterns] = await Promise.all([
    Supply.find({ _id: { $in: supplyIds } }),
    Fabric.find({ _id: { $in: fabricIds } }),
    Pattern.find({ _id: { $in: patternIds } }),
  ]);

  const allLinkData = {
    fabric: linkedFabrics,
    supply: linkedSupplies,
    pattern: linkedPatterns,
  };

  return allLinkData;
};
