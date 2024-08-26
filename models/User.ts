import { Schema, model } from "mongoose";

export interface UserData {
	username: string;
	password: string;
}

const userSchema = new Schema<UserData>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const User = model<UserData>("users", userSchema);

export default User;
