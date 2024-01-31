import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.route("/sign-up").post(register);
router.route("/sign-in").post(login);
router.route("/sign-out").post(logout);

export { router as authRoutes };