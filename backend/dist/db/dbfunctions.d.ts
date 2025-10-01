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
export declare function insertPersonnel(personnelId: string, name: string, password: string, phoneNumber: string, stationName: string): Promise<{
    name: string;
    password: string;
    phoneNumber: string;
    stationName: string;
    id: number;
    personnelId: string;
    deployed: boolean;
    currentCords: import("@prisma/client/runtime/library").JsonValue | null;
    onShift: boolean;
    geofenceId: number | null;
}>;
export declare function getPersonnelById(personnelId: string): Promise<{
    name: string;
    password: string;
    phoneNumber: string;
    stationName: string;
    id: number;
    personnelId: string;
    deployed: boolean;
    currentCords: import("@prisma/client/runtime/library").JsonValue | null;
    onShift: boolean;
    geofenceId: number | null;
} | null>;
//# sourceMappingURL=dbfunctions.d.ts.map