import mongoose from "mongoose";
const bookSchema = mongoose.Schema({   //here this mongoose is already connected to database with link in index.js
    authorname: String,  //author name
    title: String,   //book name
    price: Number,
    category: String,
    url: String,
    availability: Boolean,
    summary: { type: String }   //  store AI-generated summary(not stored by default)
});

const Book = mongoose.model("Book", bookSchema);  //this modal(Structure) of Book collection
export default Book;