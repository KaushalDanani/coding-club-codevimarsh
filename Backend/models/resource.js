import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    subject: String,
    logo: String,
    books: [],
    videos: [],
    notes: [],
});

export default mongoose.model("resource", resourceSchema);