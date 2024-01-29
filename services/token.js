import jwt from "jsonwebtoken";
import TokenModel from "../models/token.js";
import config from "../config/index.js";

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, { expiresIn: "30d" });
};

const saveToken = async (token, userId, expires) => {
    const tokenDoc = await TokenModel.create({
      token: token,
      user: userId
    });
    return tokenDoc;
};

export { generateToken, saveToken }