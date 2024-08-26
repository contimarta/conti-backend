import express from "express";
import { registerUser, loginUser } from "../controllers/users.controller.js";
import { signupValidator } from "../middleware/signup.validator.js";
const router = express.Router();
router.post("/register", signupValidator, registerUser);
router.post("/login", loginUser);
export default router;
