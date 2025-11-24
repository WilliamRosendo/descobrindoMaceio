import express from "express";
import { criarUsuario, listarUsuarios, buscarUsuarioPorId, deletarUsuario } from "../controllers/usuarios.controller.js";
import { loginUsuario } from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/", criarUsuario);
router.get("/", listarUsuarios);
router.get("/:id", buscarUsuarioPorId);
router.delete("/:id", deletarUsuario);

router.post("/login", loginUsuario)

export default router;