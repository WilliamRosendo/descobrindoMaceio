import { Router } from "express";
import {
  obterFavoritos,
  adicionarFavorito,
  removerFavorito,
} from "../controllers/favoritosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", obterFavoritos);
router.post("/add", adicionarFavorito);
router.post("/remove", removerFavorito);

export default router;
