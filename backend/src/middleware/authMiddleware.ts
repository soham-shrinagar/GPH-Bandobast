import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthReq extends Request {
    decodedToken?: any;
}

export const isAuthenticated = (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token as string;

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
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
        });
    }
};

export function verifyOfficer(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret!);
    req.userId = (decoded as any).userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}