
import { NextFunction, Request, Response } from "express";
import Url from "../db";


// - @GET - /url get all urls and alias 

export let GetUrl = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const uri: any = await Url.find().sort('-createdAt');
        // res.render('page/Urls', { uri })\
        res.json(uri)

    } catch (err) {
        
        console.error(err)
        res.status(500).json('Error 500 Server Error 😰🤧😭 ')

    }
   
}

// -@POST -/ post a new alias and get a new url
export let PostUrl = async (req: Request, res: Response, next: NextFunction) => {


    try {
        let uri: any = await Url.create(req.body)

            res.json(uri)
           
    } catch (err ) {

        console.error(err)
        res.status(500).json('Error 500 Server Error 😰🤧😭 ')

   }
}

// -@GET -/:alias get a url by alias and other info on url 
export let GetUrlALias = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let url: any = await Url.findOne({ alias: req.params.alias });

        if (!url) {
            res.status(404).json('Error 404 The url with the given Alias was not found ! 😅😥')

        } else {
            res.json(url)
         }
    } catch (err) {

        console.error(err)
        res.status(500).json('Error 500 Server Error 😰🤧😭 ')
        
    }

}


// -@GET -/:alias get a url by alias and redirect
export let GetUrlALiasAndNav = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let url: any = await Url.findOne({ alias: req.params.alias });

        if (!url) {
            res.status(404).json('Error 404 The url with the given Alias was not found ! 😅😥')

        } else {
            res.redirect(url.url)
         }
    } catch (err) {

        console.error(err)
        res.status(500).json('Error 500 Server Error 😰🤧😭 ')
        
    }

}
   

// // -@PUT -/:alias get a url by id and update it by { the url } 
// export let PutUrlAlias = async (req: Request, res: Response) => {
//     try {

//         let url: any = await Url.findOneAndUpdate({ alias: req.params.alias} ,
//             { url: req.body.url , name: req.body.name }, { new: true } );
//         if (!url) {
//             res.status(404).json('There is no url with the given alias')
//         } else {
//             res.json(url)
//             // const suburi: any = url.url 
//             // res.redirect(suburi)
//         }
    
//     } catch (err: any) {
//         console.error(err)
//         // err.details[0].message
//         res.status(500).json(err)
//     }
// }

// // -@DELETE -/:alias delete a url by alias 
// export let DeleteUrlAlias = async (req: Request, res: Response) => {
//     try {
//         let url: any = await Url.findOneAndDelete({ alias: req.params.alias})

//         if (!url) {
//             res.status(404).json('The movie with the given alais was not found...');
//         } else {
//         res.json(url)
//         }
//     } catch (err) {
//         console.error(err)
//         res.status(500).json(err)
//     }
// }