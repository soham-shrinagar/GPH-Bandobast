import type { Request, Response, NextFunction } from "express";
export interface AuthReq extends Request {
    decodedToken?: any;
}
export declare const isAuthenticated: (req: AuthReq, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
/** --- verifyOfficer middleware (unchanged behaviour) --- */
export declare function verifyOfficer(req: any, res: any, next: any): any;
//# sourceMappingURL=authMiddleware.d.ts.map