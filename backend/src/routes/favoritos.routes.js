import { Router } from "express";
import {
  getFavoritos,
  addFavorito,
  removeFavorito,
} from "../controllers/favoritosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getFavoritos);
router.post("/add", addFavorito);
router.post("/remove", removeFavorito);

export default router;
