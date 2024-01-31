import jwt from "jsonwebtoken";
import config from "../config/index.js";

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, { expiresIn: "30d" });
};

const setTokenCookie = async (token, res) => {
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: config.env === "production",
    });
}

export { generateToken, setTokenCookie }