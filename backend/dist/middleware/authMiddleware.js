import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({
                message: "Auth token is missing",
            });
        }
        if (!process.env.jwt_secret) {
            console.error("jwt serect key missing!");
            return res.status(500).json({
                message: "Internal Server Error!",
            });
        }
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.decodedToken = decoded;
        return next();
    }
    catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
        });
    }
};
//# sourceMappingURL=authMiddleware.js.map