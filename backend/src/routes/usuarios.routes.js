import express from "express";
import { criarUsuario, listarUsuarios, buscaUsuarioPorId, deletarUsuario, loginUsuario, atualizarUsuario } from "../controllers/usuarioscontroller.js";

const router = express.Router();

router.post("/login", loginUsuario);

router.post("/", criarUsuario);
router.get("/", listarUsuarios);
router.get("/:id", buscaUsuarioPorId);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;