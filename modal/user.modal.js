import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },  //linked to "Book" modal
            quantity: { type: Number, default: 1 },
        },
    ],
});


const User = mongoose.model("User", userSchema);  //this is another collection in database(bookstore)
//  |_______same__________|

export default User;
