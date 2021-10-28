
import { NextFunction, Request, Response } from "express";


export function asyncMiddleware(handler: any) {

    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    };
}   

