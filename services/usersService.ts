import User, { UserData } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (userData: UserData): Promise<UserData> => {
	const { username, password } = userData;

	const existingUser = await User.findOne({ username });
	if (existingUser) {
		throw new Error("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		username,
		password: hashedPassword,
	});

	return await newUser.save();
};

const authenticateUser = async (
	userData: UserData
): Promise<{ user: UserData; token: string }> => {
	const { username, password } = userData;
	const user = await User.findOne({ username });
	if (!user) {
		throw new Error("User not found");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("Invalid password");
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
		expiresIn: "1h",
	});

	return { user, token };
};

export default { createUser, authenticateUser };
