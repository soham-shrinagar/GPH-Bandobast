import prisma from "./dbclient.js";

export async function insertOfficer(officerId: string, name: string, email: string, password: string, phoneNumber: string, stationName: string){
    const newOfficer = await prisma.officer.create({
        data: {
            officerId, name, email, password, phoneNumber, stationName
        }
    });

    return newOfficer;
}

export async function getUserById(officerId: string) {
    const existingUser = await prisma.officer.findUnique({ where: {officerId}});
    
    return existingUser;
}

export async function getUserByEmail(email: string) {
    const existingUser = await prisma.officer.findUnique({ where: {email}});
    return existingUser;
}