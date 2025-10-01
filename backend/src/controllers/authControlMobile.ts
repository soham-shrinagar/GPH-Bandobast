import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import {z} from "zod";
import jwt from "jsonwebtoken";
import prisma from "../db/dbclient.js";
import {insertPersonnel, getPersonnelById} from "../db/dbfunctions.js"


export const personnelRegistration = async(req: Request, res:Response) => {
    try{
        const reqBody = z.object({
            personnelId: z.string().min(1).max(50),
            fullName: z.string().min(3).max(100),
            password: z.string().min(3).max(100),
            phoneNumber: z.string().min(10).max(10),
            stationName: z.string().min(1).max(200)
        })

        const parsedData = reqBody.safeParse(req.body);

        if(!parsedData.success){
            console.log("Zod error because of input");
            res.status(401).json({
                message: "Invalid input type"
            });
            console.error("Error from registration backend:", parsedData.error)
            return;
        }

        const {personnelId, fullName, password, phoneNumber, stationName} = parsedData.data

        const checkPersonnelId = await prisma.personnel.findUnique({where: {personnelId}});
        const checkPhoneNumber = await prisma.personnel.findUnique({where: {phoneNumber}});

        if(checkPersonnelId && !checkPhoneNumber){
            return res.status(401).json({
                message: "User with this Id already exists"
            });
        }

        if(!checkPersonnelId && checkPhoneNumber){
            return res.status(401).json({
                message: "User with this phone number already exists"
            });
        }

        if(checkPersonnelId && checkPhoneNumber){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 8);
        const newPersonnel = await insertPersonnel(personnelId, fullName, hashPassword, phoneNumber, stationName)

        res.status(200).json({
            message: "Your registration is successfull!",
            personnel: {
                personnelId: newPersonnel.personnelId,
                personnelName: newPersonnel.name
            }
        })
    } catch (err) {
        console.error("Error from personnelRegistration endpoint from backend: ", err);
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

export const loginWithPersonnelId = async(req:Request, res:Response) => {
    try{
        const reqBody = z.object({
            personnelId: z.string().min(1).max(50),
            password: z.string().min(3).max(100)
        });

        const parsedData = reqBody.safeParse(req.body);

        if(!parsedData.success){
            console.log("Zod error because of invalid input");
            return res.status(401).json({
                message: "Invalid Input"
            });
        }

        const { personnelId, password } = parsedData.data;
        const existingUser = await getPersonnelById(personnelId);

        if(!existingUser){
            console.log("No user with this email exists");
            return res.status(401).json({
                message: "No user with this email exists"
            });
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password!);

        if(!matchPassword){
            res.status(401).json({
                message: "Incorrect password"
            })
        }

        if(!process.env.jwt_secret){
            return res.status(500).json({
                message: "Internal Server Issue"
            })
        }

        const token = jwt.sign({userId: existingUser.id}, process.env.jwt_secret, {expiresIn: "3h"});

        res.status(200).json({
            message: "You have successfully logged in",
            token: token,
            personnel: existingUser.name,
            personnelId: existingUser.personnelId
        })
    } catch (err) {
        console.error("Error from the loginWithPersonnelId endpoint backend:", err);
        return res.status(401).json({
            message: "Something went wrong"
        });
    }
}