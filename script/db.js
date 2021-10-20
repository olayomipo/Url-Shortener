"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlSchema = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const url = "mongodb://localhost:27017/Url_Shortener";
const uri = "mongodb+srv://Lily-Crown999:Lily-Crown999@cluster0.ynj90.mongodb.net/Url-Shortenerz?retryWrites=true&w=majority";
function connectDB() {
    mongoose_1.default.connect(uri, (err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log(`Successfully Connected! at %s`, uri);
        }
    });
}
exports.connectDB = connectDB;
exports.UrlSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    alias: { type: String, required: false, unique: true, default: () => (0, nanoid_1.nanoid)(10), }
}, { timestamps: true });
const Url = mongoose_1.default.model("Url", exports.UrlSchema);
exports.default = Url;
