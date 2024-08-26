import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
	id: string;
	iat: number;
	exp: number;
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (token !== undefined && token !== null) {
			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET as string
			) as DecodedToken;
			req.body.userId = decodedToken.id;
		}

		next();
	} catch (error) {
		next();
	}
};

export default auth;
