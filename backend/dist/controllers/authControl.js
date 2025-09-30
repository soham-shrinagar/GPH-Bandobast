import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import prisma from "../db/dbclient.js";
import { insertOfficer, getUserByEmail, getUserById } from "../db/dbfunctions.js";
export const registration = async (req, res) => {
    try {
        const reqBody = z.object({
            officerId: z.string().min(1).max(50),
            name: z.string().min(3).max(100),
            email: z.string().min(3).max(200).email(),
            password: z.string().min(3).max(100),
            phoneNumber: z.string().min(10).max(10),
            stationName: z.string().min(1).max(200)
        });
        const parsedData = reqBody.safeParse(req.body);
        if (!parsedData.success) {
            console.log("Zod error because of input");
            res.status(401).json({
                message: "Invalid input type"
            });
            console.error("Error from registration backend: ", parsedData.error);
            return;
        }
        const { officerId, name, email, password, phoneNumber, stationName } = parsedData.data;
        const checkId = await prisma.officer.findUnique({ where: { officerId } });
        const checkPhoneNumber = await prisma.officer.findUnique({ where: { phoneNumber } });
        if (checkId && !checkPhoneNumber) {
            return res.status(401).json({
                message: "User with this Id already exists"
            });
        }
        if (!checkId && checkPhoneNumber) {
            return res.status(401).json({
                message: "User with this phone number already exists"
            });
        }
        if (checkId && checkPhoneNumber) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashPassword = await bcrypt.hash(password, 8);
        const newOfficer = await insertOfficer(officerId, name, email, hashPassword, phoneNumber, stationName);
        res.status(200).json({
            message: "Your registration is successfull!",
            officer: {
                officerId: newOfficer.officerId,
                officerName: newOfficer.name
            }
        });
    }
    catch (err) {
        console.error("Error from registration endpoint from backend: ", err);
        return res.status(400).json({
            message: "Something went wrong"
        });
    }
};
export const loginWithEmail = async (req, res) => {
    try {
        const reqBody = z.object({
            email: z.string().min(3).max(200).email(),
            password: z.string().min(3).max(100)
        });
        const parsedData = reqBody.safeParse(req.body);
        if (!parsedData.success) {
            console.log("Zod error because of invalid input");
            return res.status(401).json({
                message: "Invalid Input"
            });
        }
        const { email, password } = parsedData.data;
        const existingUser = await getUserByEmail(email);
        if (!existingUser) {
            console.log("No user with this email exists");
            return res.status(401).json({
                message: "No user with this email exists"
            });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            res.status(401).json({
                message: "Incorrect password"
            });
        }
        if (!process.env.jwt_secret) {
            return res.status(500).json({
                message: "Internal Server Issue"
            });
        }
        const token = jwt.sign({ userId: existingUser.id }, process.env.jwt_secret, {
            expiresIn: "3h"
        });
        res.status(200).json({
            message: "You have successfully logged in",
            token: token,
            officer: existingUser.name,
            officerId: existingUser.officerId
        });
    }
    catch (err) {
        console.error("Error from the login endpoint backend: ", err);
        return res.status(401).json({
            message: "Something went wrong"
        });
    }
};
export const loginWithId = async (req, res) => {
    try {
        const reqBody = z.object({
            officerId: z.string().min(1).max(50),
            password: z.string().min(3).max(100)
        });
        const parsedData = reqBody.safeParse(req.body);
        if (!parsedData.success) {
            console.log("Zod error because of invalid input");
            return res.status(401).json({
                message: "Invalid Input"
            });
        }
        const { officerId, password } = parsedData.data;
        const existingUser = await getUserById(officerId);
        if (!existingUser) {
            console.log("No user with this email exists");
            return res.status(401).json({
                message: "No user with this email exists"
            });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            res.status(401).json({
                message: "Incorrect password"
            });
        }
        if (!process.env.jwt_secret) {
            return res.status(500).json({
                message: "Internal Server Issue"
            });
        }
        const token = jwt.sign({ userId: existingUser.id }, process.env.jwt_secret, {
            expiresIn: "3h"
        });
        res.status(200).json({
            message: "You have successfully logged in",
            token: token,
            officer: existingUser.name,
            officerId: existingUser.officerId
        });
    }
    catch (err) {
        console.error("Error from the login endpoint backend: ", err);
        return res.status(401).json({
            message: "Something went wrong"
        });
    }
};
//# sourceMappingURL=authControl.js.map