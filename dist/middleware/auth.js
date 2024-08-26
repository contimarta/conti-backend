import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token !== undefined && token !== null) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userId = decodedToken.id;
        }
        next();
    }
    catch (error) {
        next();
    }
};
export default auth;
