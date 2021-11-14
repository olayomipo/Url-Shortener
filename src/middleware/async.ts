
import { Response, Request, NextFunction } from "express";


export function asyncMiddleware (handler) {

    return async (req: Request, res: Response, next:NextFunction) => {
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    };
}   
