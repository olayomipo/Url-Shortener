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
exports.DeleteUrlAlias = exports.PutUrlAlias = exports.GetUrlALias = exports.PostUrl = exports.GetUrl = void 0;
const db_1 = __importDefault(require("../db"));
// - @GET - /url get all urls and alias 
let GetUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield db_1.default.find().lean();
        let uri = url;
        res.render('Urls', { uri });
    }
    catch (err) {
        console.error(err);
    }
});
exports.GetUrl = GetUrl;
// -@POST -/ post a new alias and get a new url
let PostUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = new db_1.default(req.body);
        yield url.save();
        res.send(url);
    }
    catch (err) {
        res.send(err);
        console.error(err);
    }
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
});
exports.GetUrlALias = GetUrlALias;
// -@PUT -/:alias get a url by id and update it by { the url } 
let PutUrlAlias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = yield db_1.default.findOneAndUpdate({ alias: req.params.alias }, { url: req.body.url, name: req.body.name }, { new: true });
        if (!url) {
            res.status(404).send('There is no url with the given alias');
        }
        else {
            res.send(url);
            // const suburi: any = url.url 
            // res.redirect(suburi)
        }
    }
    catch (err) {
        console.error(err);
        // err.details[0].message
        res.status(500).send(err);
    }
});
exports.PutUrlAlias = PutUrlAlias;
// -@DELETE -/:alias delete a url by alias 
let DeleteUrlAlias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = yield db_1.default.findOneAndDelete({ alias: req.params.alias });
        if (!url) {
            res.status(404).send('The movie with the given alais was not found...');
        }
        else {
            res.send(url);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
exports.DeleteUrlAlias = DeleteUrlAlias;
