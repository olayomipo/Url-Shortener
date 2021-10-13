
import { Request, Response } from "express";
import Url from "../db";

// - @GET - /url get all urls and alias 

export let GetUrl = (req: Request, res: Response) => {
    let url: any = Url.find((err: any, uri: any) => {
        if(err) {
            res.send(err)
        } else {
            res.send(uri)
        }
    })
}
// -@POST -/url post a new alias and get a new url
export let PostUrl = async (req: Request, res: Response) => {
    let url : any = new Url(req.body);

     await url.save((err: any) => {
            if(err) {
                res.send(err)
            } else {
                res.send(url)
            }
        })

}