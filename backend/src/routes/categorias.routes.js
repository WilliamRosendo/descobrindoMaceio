import { Router } from "express";
import { getCategorias } from '../controllers/categoriaController.js';

const router = Router();
router.get('/', getCategorias);

export default router;
