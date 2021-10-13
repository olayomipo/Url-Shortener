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
exports.PostUrl = exports.GetUrl = void 0;
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
// -@POST -/url post a new alias and get a new url
let PostUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = new db_1.default(req.body);
    yield url.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(url);
        }
    });
});
exports.PostUrl = PostUrl;
