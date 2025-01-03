import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import {
  comparePassword,
  encryptPassword,
  generateToken,
} from "../helper/index.js";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        errorHandler(
          400,
          "Email is already registered. Please use a different email address!"
        )
      );
    }

    const hashedPassword = await encryptPassword(password);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const payload = { id: newUser._id };
    const token = generateToken(payload);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        _id: newUser._id,
        email: newUser.email,
        displayName: newUser.displayName,
        access_token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password, deviceType, deviceToken } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await comparePassword(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const payload = { id: validUser._id };
    const token = generateToken(payload);
    validUser.deviceType = deviceType;
    validUser.deviceToken = deviceToken;
    await validUser.save();
    res.status(201).json({
      success: true,
      message: "User login successfully!",
      user: {
        _id: validUser._id,
        email: validUser.email,
        displayName: validUser.displayName,
        access_token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { email, deviceType, deviceToken, displayName, profileImage } =
      req.body;
      

    let user = await User.findOne({ email });
    if (user) {
      const payload = { id: user._id };
      const token = generateToken(payload);

      user.deviceType = deviceType;
      user.deviceToken = deviceToken;

      await user.save();

      res.status(201).json({
        success: true,
        message: "Social login successfully!",
        user: {
          _id: user._id,
          email: user.email,
          displayName: user.displayName,
          access_token: token,
        },
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await encryptPassword(generatedPassword);
      const newUser = new User({
        email,
        displayName,
        profileImage,
        password: hashedPassword,
        deviceType,
        deviceToken,
      });

      await newUser.save();

      const payload = { id: newUser._id };
      const token = generateToken(payload);

      res.status(201).json({
        success: true,
        message: "User created and logged in successfully!",
        user: {
          _id: newUser._id,
          email: newUser.email,
          displayName: newUser.displayName,
          access_token: token,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { deviceToken: null, deviceType: null },
      { new: true }
    );
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }
    res.status(201).json({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (error) {
    next(error);
  }
};
