import express from "express";
import middlewares from '../middlewares/index.js';
import { getUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/list", middlewares.authenticate, getUsers);

export { router as usersRoutes };