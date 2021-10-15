
import mongoose from "mongoose";
import { nanoid } from "nanoid";
const uri = "mongodb://localhost:27017/Url_Shortener";

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
    name: { type: String, required: true},
    url: { type: String, required: true },
    alias: { type: String, required: false , unique: true, default: () => nanoid(10),}
}, { timestamps: true });
const Url = mongoose.model("Url", UrlSchema);
export default Url;

