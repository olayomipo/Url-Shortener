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
exports.GetUrlALias = exports.PostUrl = exports.GetUrl = void 0;
const db_1 = __importDefault(require("../db"));
// - @GET - /url get all urls and alias 
let GetUrl = (req, res) => {
    let url = db_1.default.find((err, uri) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(uri);
        }
    });
};
exports.GetUrl = GetUrl;
// -@POST -/ post a new alias and get a new url
let PostUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = new db_1.default(req.body);
    yield url.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            // const suburi: any = url.url 
            // res.redirect(suburi)
            res.send(url);
        }
    });
    // /:alias => res.redirect ( url )
    // res.redirect(url)
});
exports.PostUrl = PostUrl;
// -@GET -/:alias get a url by alias
let GetUrlALias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = yield db_1.default.findOne({ alias: req.params.alias });
        if (!url) {
            res.status(404).send('There is no url with the given alias');
        }
        else {
            const suburi = url.url;
            res.redirect(suburi);
            // res.send(url)
        }
    }
    catch (err) {
        res.send(err);
        res.redirect('/url');
    }
    // .lean()
});
exports.GetUrlALias = GetUrlALias;
