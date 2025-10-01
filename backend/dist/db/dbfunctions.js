import prisma from "./dbclient.js";
export async function insertOfficer(officerId, name, email, password, phoneNumber, stationName) {
    const newOfficer = await prisma.officer.create({
        data: {
            officerId, name, email, password, phoneNumber, stationName
        }
    });
    return newOfficer;
}
export async function getUserById(officerId) {
    const existingUser = await prisma.officer.findUnique({ where: { officerId } });
    return existingUser;
}
export async function getUserByEmail(email) {
    const existingUser = await prisma.officer.findUnique({ where: { email } });
    return existingUser;
}
export async function insertPersonnel(personnelId, name, password, phoneNumber, stationName) {
    const newPersonnel = await prisma.personnel.create({
        data: {
            personnelId, name, password, phoneNumber, stationName
        }
    });
    return newPersonnel;
}
export async function getPersonnelById(personnelId) {
    const existingUser = await prisma.personnel.findUnique({ where: { personnelId } });
    return existingUser;
}
//# sourceMappingURL=dbfunctions.js.map