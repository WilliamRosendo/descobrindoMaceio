import { Router } from "express";
import lugaresRoutes from "./lugares.routes.js";
import categoriasRoutes from "./categorias.routes.js"

const router = Router();
router.use("/lugares", lugaresRoutes);
router.use("/categorias", categoriasRoutes)

export default router;
