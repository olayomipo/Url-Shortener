"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUrlALias = exports.PostUrl = exports.GetHome = exports.GetUrl = void 0;
const db_1 = __importDefault(require("../db"));
// - @GET - /url get all urls and alias 
let GetUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield db_1.default.find().lean();
        let uri = url;
        res.render('page/Urls', { uri });
    }
    catch (err) {
        console.error(err);
        res.render('err/500');
    }
});
exports.GetUrl = GetUrl;
// - @GET - /home make a new url with auto generated alias
let GetHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('page/Home');
    }
    catch (err) {
        console.error(err);
        res.render('err/500');
    }
});
exports.GetHome = GetHome;
// -@POST -/ post a new alias and get a new url
let PostUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagelink = 'https://urlshortenerz/';
    try {
        let uri = yield db_1.default.create(req.body);
        res.render('page/Created', { uri, pagelink: pagelink });
    }
    catch (err) {
        res.render('err/400C', {
            error: err
        });
        console.error(err);
    }
});
exports.PostUrl = PostUrl;
// -@GET -/:alias get a url by alias
let GetUrlALias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = yield db_1.default.findOne({ alias: req.params.alias });
        if (!url) {
            res.render('err/404');
        }
        else {
            const suburi = url.url;
            res.redirect(suburi);
            // res.send(url)
        }
    }
    catch (err) {
        console.error(err);
        res.render('err/500');
    }
});
exports.GetUrlALias = GetUrlALias;
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
