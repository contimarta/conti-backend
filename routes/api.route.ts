import express from "express";
import {
	getCharacterCount,
	getAverageValue,
} from "../controllers/api.controller";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/submit", auth, getCharacterCount);
router.get("/average", auth, getAverageValue);

export default router;
