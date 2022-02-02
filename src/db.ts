
import mongoose from "mongoose";
import { nanoid } from "nanoid";
const url = "mongodb://localhost:27017/Url_Shortener";
const uri = "mongodb+srv://Lily-Crown999:Lily-Crown999@cluster0.ynj90.mongodb.net/Url-Shortenerz?retryWrites=true&w=majority"


export function connectDB() {
        mongoose.connect(uri, (err) => {
            if (err) {
                console.log(err.message);
            }
            else {
                console.log(`Successfully Connected! at %s`, uri);
            }
        });
}

export const UrlSchema = new mongoose.Schema({
    uri: { type: String, required: false, default: "http://uriurl.herokuapp.com/"},
    name: { type: String, required: true},
    url: { type: String, required: true },
    alias: { type: String, required: false, default: () => nanoid(5) },
  }, { timestamps: true });
const Url = mongoose.model("Url", UrlSchema);
export default Url;
