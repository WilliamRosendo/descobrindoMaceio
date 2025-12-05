import { Router } from "express";
import { getTideInfo } from "../controllers/tabua-mare.controller.js";

const router = Router();

router.get("/", getTideInfo);

export default router;
