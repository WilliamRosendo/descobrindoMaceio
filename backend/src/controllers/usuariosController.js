import Usuario from "../models/usuarios.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
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
        email: usuario.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash
    });

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      },
    });
  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({ error: "Este e-mail já está cadastrado." });
    }

    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-senha");
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const buscaUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-senha");

    if (!usuario) 
      return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    // Se vier senha no body, criptografa antes de salvar
    if (dados.senha) {
      const salt = await bcrypt.genSalt(10);
      dados.senha = await bcrypt.hash(dados.senha, salt);
    }

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      dados,
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    usuarioAtualizado.senha = undefined;

    res.json(usuarioAtualizado);

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ erro: "Erro ao atualizar" });
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