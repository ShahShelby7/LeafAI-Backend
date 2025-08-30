import { Router } from "express";
import { getBooks, getBookData, getBookSummary } from "../controller/book.controller.js";

const router = Router();

router.get("/", getBooks);  //this api get request
router.get("/:id", getBookData);
router.get("/:id/summary", getBookSummary);
export default router;