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

export async function insertPersonnel(personnelId: string, name: string, password: string, phoneNumber: string, stationName: string){
    const newPersonnel = await prisma.personnel.create({
        data: {
            personnelId, name, password, phoneNumber, stationName
        }
    });

    return newPersonnel;
}

export async function getPersonnelById(personnelId: string) {
    const existingUser = await prisma.personnel.findUnique({ where: {personnelId}});
    
    return existingUser;
}