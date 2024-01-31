import Joi from "joi";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import UserModel from "../models/user.js";
import { generateToken, setTokenCookie } from "../services/token.js";

const register = asyncHandler(async (req, res) => {
  try {  
    const { body } = req
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
    const { value, error } = schema.validate(body)
    
    if (error) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { email, password } = value
  
    if (!email || !password) {
      return res.status(400).json({ error: "Please add all fields" });
    }
  
    // check if user exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
    }
  
    // create hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // create user
    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
  
    if (user) {
      const token = generateToken(user._id);
      setTokenCookie(token);

      res.status(201).json({
        user: {
        _id: user.id,
        email: user.email,
        },
        token: token,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
  res.status(400).json({ error: "Please add all fields" });
  }

  // Check for user email
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    setTokenCookie(token);
    res.json({
      user: {
        _id: user.id,
        email: user.email,
      },
      token: token,
    });
  } else {
    res.status(400).json({ error: "Invalid credentials" });
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		  res.status(500).json({ error: "Internal Server Error" });
	}
});

const forgotPassword = asyncHandler(async (req, res) => {
});

const resetPassword = asyncHandler(async (req, res)=> {
});

const sendVerificationEmail = asyncHandler(async (req, res) => {
});

const verifyEmail = asyncHandler(async (req, res) => {
});

export { login, register };