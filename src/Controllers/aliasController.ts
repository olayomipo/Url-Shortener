
import { Request, Response } from "express";
import Url from "../db";

// - @GET - /url get all urls and alias 

export let GetUrl = async (req: Request, res: Response) => {
    try {
        const url: any = await Url.find().lean()
         let uri: any = url
        res.render('Urls', { uri })

    } catch (err) {
        console.error(err)
    }
   
}
// -@POST -/ post a new alias and get a new url
export let PostUrl = async (req: Request, res: Response) => {

    try {
        let url: any = new Url(req.body);

        await url.save()

        res.send(url)

        
    } catch (err) {
        res.send(err)
        console.error(err)
   }
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

}

// -@PUT -/:alias get a url by id and update it by { the url } 
export let PutUrlAlias = async (req: Request, res: Response) => {
    try {

        let url: any = await Url.findOneAndUpdate({ alias: req.params.alias} ,
            { url: req.body.url , name: req.body.name }, { new: true } );
        if (!url) {
            res.status(404).send('There is no url with the given alias')
        } else {
            res.send(url)
            // const suburi: any = url.url 
            // res.redirect(suburi)
        }
    
    } catch (err: any) {
        console.error(err)
        // err.details[0].message
        res.status(500).send(err)
    }
}

// -@DELETE -/:alias delete a url by alias 
export let DeleteUrlAlias = async (req: Request, res: Response) => {
    try {
        let url: any = await Url.findOneAndDelete({ alias: req.params.alias})

        if (!url) {
            res.status(404).send('The movie with the given alais was not found...');
        } else {
        res.send(url)
        }
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}