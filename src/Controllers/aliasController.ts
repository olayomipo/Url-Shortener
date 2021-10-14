
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
// -@POST -/ post a new alias and get a new url
export let PostUrl = async (req: Request, res: Response) => {
    let url: any = new Url(req.body);

     await url.save((err: any) => {
            if(err) {
              res.send(err)
            } else {
                // const suburi: any = url.url 
                // res.redirect(suburi)
                res.send(url)
            }
        })
          // /:alias => res.redirect ( url )
        // res.redirect(url)
}
// -@GET -/:alias get a url by alias
export let GetUrlALias = async (req: Request, res: Response) => {
    try {
        let url: any = await Url.findOne({ alias: req.params.alias });

        if (!url) {
            res.status(404).send('There is no url with the given alias')
        } else {
             const suburi: any = url.url 
                res.redirect(suburi)
            // res.send(url)
         }
    } catch (err) {
        res.send(err)
        res.redirect('/url')
    }

    // .lean()
}