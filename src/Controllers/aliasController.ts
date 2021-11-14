
import { NextFunction, Request, Response } from "express";
import Url from "../db";
import path from 'path';
// - @GET - /url get all urls and alias 

export let GetUrl = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const uri: any = await Url.find().sort('-createdAt').lean()
        // res.render('page/Urls', { uri })\
        res.send(uri)

    } catch (err) {
        
        console.error(err)
        res.redirect('/500')
    }
   
}

// -@POST -/ post a new alias and get a new url
export let PostUrl = async (req: Request, res: Response, next: NextFunction) => {


    try {
        let uri: any = await Url.create(req.body)

            res.send(uri)
           
    } catch (err ) {
        console.error(err)
        res.redirect('/500')

   }
}
// -@GET -/:alias get a url by alias
export let GetUrlALias = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let url: any = await Url.findOne({ alias: req.params.alias });

        if (!url) {
            res.redirect('/404')

        } else {
            res.send(url)
         }
    } catch (err) {
        console.error(err)
        // res.sendFile(path.join(__dirname + '../../../views/err/500.html'))
        res.redirect('/500')
        res.send(err)

    }

}


// -@GET -/404 get a status 404 error html page
export let error404 = async (req: Request, res: Response) => {
 res.sendFile(path.join(__dirname + '../../../err/404.html'))
}


// -@GET -/500 get a  status 500 error html page
export let error500 = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '../../../err/500.html'))
}
   

// // -@PUT -/:alias get a url by id and update it by { the url } 
// export let PutUrlAlias = async (req: Request, res: Response) => {
//     try {

//         let url: any = await Url.findOneAndUpdate({ alias: req.params.alias} ,
//             { url: req.body.url , name: req.body.name }, { new: true } );
//         if (!url) {
//             res.status(404).send('There is no url with the given alias')
//         } else {
//             res.send(url)
//             // const suburi: any = url.url 
//             // res.redirect(suburi)
//         }
    
//     } catch (err: any) {
//         console.error(err)
//         // err.details[0].message
//         res.status(500).send(err)
//     }
// }

// // -@DELETE -/:alias delete a url by alias 
// export let DeleteUrlAlias = async (req: Request, res: Response) => {
//     try {
//         let url: any = await Url.findOneAndDelete({ alias: req.params.alias})

//         if (!url) {
//             res.status(404).send('The movie with the given alais was not found...');
//         } else {
//         res.send(url)
//         }
//     } catch (err) {
//         console.error(err)
//         res.status(500).send(err)
//     }
// }