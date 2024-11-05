import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
	const { displayName, email, password, unit, currency } = req.body;
	const hashedPassword = bcryptjs.hashSync(password, 10);
	const newUser = new User({
		displayName,
		email,
		password: hashedPassword,
		unit,
		currency,
	});
	try {
		await newUser.save();
		res.status(201).json("User created successfully!");
	} catch (error) {
		next(error);
	}
};

export const signin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) return next(errorHandler(404, "User not found!"));
		const validPassword = bcryptjs.compareSync(password, validUser.password);
		if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

		//exclude password from the response
		const { password: pass, ...restDetails } = validUser._doc;

		res
			.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json(restDetails);
	} catch (error) {
		next(error);
	}
};

export const googleLogin = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

			//exclude password from the response
			const { password: pass, ...restDetails } = user._doc;

			res
				.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(restDetails);
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
			const newUser = new User({
				displayName: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				profileImage: req.body.photo,
			});
			await newUser.save();
			const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
			const { password: pass, ...restDetails } = newUser._doc;
			res
				.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(restDetails);
		}
	} catch (error) {
		next(error);
	}
};

export const signout = async (req, res, next) => {
	try {
		res.clearCookie("access_token");
		res.status(200).json("User has been logged out!");
	} catch (error) {
		next(error);
	}
};
