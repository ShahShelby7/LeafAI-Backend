import User from "../modal/user.modal.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {   //signup have some new data to insert into database so post req
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname,
            email,
            password: hashPassword
        });
        await createdUser.save();     //inserting the data to database
        return res.status(201).json({ message: "User Created Successfully", user: createdUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json(({ message: "Internal server error" }));
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatched = await bcryptjs.compare(password, user.password);  //comapare the password(from req) to database password
        if (!user || !isMatched) {
            return res.status(400).json({ message: "Invalid password or username" });
        }
        else {
            return res.status(201).json({
                message: "Login sucessful", user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(({ message: "Internal server error" }));
    }
}



export const addtoCart = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //if bookid already exist in cart array -> get index
        const itemIndex = user.cart.findIndex(
            (item) => item.bookId.toString() === bookId
        );

        if (itemIndex > -1) {
            // book already in cart -> increase qty
            user.cart[itemIndex].quantity += 1;
        } else {
            // new book -> add with qty = 1
            user.cart.push({ bookId, quantity: 1 });
        }

        // save updated user
        await user.save();

        return res.status(200).json({
            message: "Book added to cart successfully",
            cart: user.cart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//get cart details of specific user(get req)
export const getCart = async (req, res) => {
    try {
        const { id } = req.params;

        // find user and populate the cart with ids of books(user with all books details)
        const user = await User.findById(id).populate("cart.bookId");
        // console.log(user.cart);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user.cart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//increase qunatity(post req)
export const increaseBookQuan = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await User.findById(userId);
        const cartItem = user.cart.find(item => item.bookId.toString() === bookId);

        if (!cartItem) {
            user.cart.push({ bookId, quantity: 1 });
        } else if (cartItem.quantity < 10) {
            cartItem.quantity += 1;
        } else {
            res.status(500).json({ message: "Max Quantity Reached" });
        }

        await user.save();
        await user.populate("cart.bookId");

        res.status(200).json({ message: "Quantity Increased", cart: user.cart });  //just send the cart of user(not whole user)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error increasing quantity" });
    }
};

// Decrease quantity
export const decreaseBookQuan = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await User.findById(userId);
        const cartItem = user.cart.find(item => item.bookId.toString() === bookId);

        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                // remove if quantity is 1 and goes to 0
                user.cart = user.cart.filter(item => item.bookId.toString() !== bookId);
            }
        }

        await user.save();
        await user.populate("cart.bookId");

        res.status(200).json({ message: "Quantity Decreased", cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error decreasing quantity" });
    }
};

// Remove book completely
export const removeBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await User.findById(userId);
        user.cart = user.cart.filter(item => item.bookId.toString() !== bookId);  //updating the cart

        await user.save();
        await user.populate("cart.bookId");

        res.json({ message: "Book removed", cart: user.cart });  //return the updated cart
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing book" });
    }
};