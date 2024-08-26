import usersService from "../services/usersService.js";
import { validationResult } from "express-validator";
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }
    try {
        const newUser = await usersService.createUser(req.body);
        res
            .status(201)
            .json({ message: "User registered", username: newUser.username });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ errors: [{ msg: error.message }] });
        }
        else {
            res
                .status(500)
                .json({ errors: [{ msg: "An unexpected error occurred" }] });
        }
    }
};
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await usersService.authenticateUser({
            username,
            password,
        });
        res.status(200).json({ message: "User logged in", user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};
