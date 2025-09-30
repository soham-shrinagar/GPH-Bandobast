import type { Request, Response } from "express";
export declare const registration: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginWithEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginWithId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authControl.d.ts.map