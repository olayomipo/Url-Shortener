"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUrlALias = exports.PostUrl = exports.GetUrl = void 0;
const tslib_1 = require("tslib");
const db_1 = (0, tslib_1.__importDefault)(require("../db"));
let GetUrl = async (req, res, next) => {
    try {
        const uri = await db_1.default.find().sort('-createdAt');
        res.send(uri);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error 500 Server Error 😰🤧😭 ');
    }
};
exports.GetUrl = GetUrl;
let PostUrl = async (req, res, next) => {
    try {
        let uri = await db_1.default.create(req.body);
        res.send(uri);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error 500 Server Error 😰🤧😭 ');
    }
};
exports.PostUrl = PostUrl;
let GetUrlALias = async (req, res, next) => {
    try {
        let url = await db_1.default.findOne({ alias: req.params.alias });
        if (!url) {
            res.status(404).send('Error 404 The url with the given Alias was not found ! 😅😥');
        }
        else {
            res.send(url);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error 500 Server Error 😰🤧😭 ');
    }
};
exports.GetUrlALias = GetUrlALias;
