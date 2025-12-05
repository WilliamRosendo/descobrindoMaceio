import { Router } from "express";
import lugaresRoutes from "./lugares.routes.js";
import categoriasRoutes from "./categorias.routes.js"
import tideRoutes from "./tabua-mare.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import favoritosRoutes from "./favoritos.routes.js"



const router = Router();
router.use("/lugares", lugaresRoutes);
router.use("/categorias", categoriasRoutes)
router.use("/tide", tideRoutes)
router.use("/usuarios", usuariosRoutes);
router.use("/favoritos", favoritosRoutes);


export default router;
