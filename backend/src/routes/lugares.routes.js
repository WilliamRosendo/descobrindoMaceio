import { Router } from "express";
import { listarLugares, listarLugaresPorCategoria, buscarLugarPorId } from "../controllers/lugarController.js";

const router = Router();

router.get("/", listarLugares);

router.get("/categoria/:id", listarLugaresPorCategoria);

router.get("/:id", buscarLugarPorId);

export default router;
