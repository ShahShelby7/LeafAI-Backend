import { Router } from "express";
import { getRecommend } from "../controller/ai.controller.js";
const router = Router();

router.post("/", getRecommend);
export default router;