import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

// Load environment variables
config({ path: `.env.${process.env.NODE_ENV}` });

// Create an Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

const uri: string = process.env.MONGODB_URI as string;

const main = async () => {
	console.log(`Connecting to DB @ ${uri}`);
	await mongoose.connect(uri);
	console.log(`Connected to DB @ ${uri}`);
};

main().catch((err) => console.log(err));

// Import routes
import usersRouter from "./routes/users.route.js";
import apiRouter from "./routes/api.route.js";

// Use routes
app.use("/users", usersRouter);
app.use("/api", apiRouter);

// Set the server to listen on a specific port
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

export default app;
