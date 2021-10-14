
import mongoose from "mongoose";

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
    url: { type: String, required: true },
    alias: { type: String, required: true }
}, { timestamps: true });
const Url = mongoose.model("Url", UrlSchema);
export default Url;

