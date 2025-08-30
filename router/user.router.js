import { Router } from "express";
import { login, signup, getCart, addtoCart, increaseBookQuan, decreaseBookQuan, removeBook } from "../controller/user.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/addtocart", addtoCart);  //here we got necessary details like bookid and userid in post request body
router.get("/cart/:id", getCart);   //get req only user id needed to get cart
router.post("/cart/increase", increaseBookQuan);  //post req's with bookid and userid
router.post("/cart/decrease", decreaseBookQuan);
router.post("/cart/remove", removeBook);


export default router;