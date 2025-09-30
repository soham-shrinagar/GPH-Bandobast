export declare function insertOfficer(officerId: string, name: string, email: string, password: string, phoneNumber: string, stationName: string): Promise<{
    officerId: string;
    name: string;
    email: string;
    password: string | null;
    phoneNumber: string;
    stationName: string;
    id: number;
}>;
export declare function getUserById(officerId: string): Promise<{
    officerId: string;
    name: string;
    email: string;
    password: string | null;
    phoneNumber: string;
    stationName: string;
    id: number;
} | null>;
export declare function getUserByEmail(email: string): Promise<{
    officerId: string;
    name: string;
    email: string;
    password: string | null;
    phoneNumber: string;
    stationName: string;
    id: number;
} | null>;
//# sourceMappingURL=dbfunctions.d.ts.map