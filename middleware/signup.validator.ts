import { body } from "express-validator";
export const signupValidator = [
	body("username")
		.exists()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long."),
	body("password")
		.exists()
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long."),
];
