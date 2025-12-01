import { Router } from "express";
import { listarLugares, listarLugaresPorCategoria } from "../controllers/lugarController.js";

const router = Router();

router.get("/", listarLugares);
router.get("/categoria/:id", listarLugaresPorCategoria);

export default router;
