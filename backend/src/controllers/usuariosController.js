import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";

export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (usuario.senha !== senha) { 
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario._id }, 
      process.env.JWT_SECRET,  
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const criarUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

export const buscaUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.fingById(req.params.id);
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado"});
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuário removido com sucesso" })
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};