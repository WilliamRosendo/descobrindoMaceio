
import Favoritos from "../models/favoritos.js";
import mongoose from "mongoose";

const categoriasPadrao = {
  Praias: [],
  "Passeios Culturais": [],
  Lazer: [],
};

const categoriasValidas = Object.keys(categoriasPadrao);

export const getFavoritos = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    
    let favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      favoritos = await Favoritos.create({
        usuario_id: usuarioId,
        categorias: { ...categoriasPadrao },
      });
    }

    res.json({ categorias: favoritos.categorias || categoriasPadrao });
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err);
    res.status(500).json({ error: "Erro interno ao buscar favoritos" });
  }
};

export const addFavorito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { categoria, lugarId } = req.body;

    if (!categoria || !lugarId) {
      return res.status(400).json({ error: "Categoria e lugarId são obrigatórios." });
    }

    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    if (!mongoose.Types.ObjectId.isValid(lugarId)) {
      return res.status(400).json({ error: "ID do lugar inválido." });
    }

    let favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      favoritos = await Favoritos.create({
        usuario_id: usuarioId,
        categorias: { ...categoriasPadrao },
      });
    }

    const lugarObjectId = new mongoose.Types.ObjectId(lugarId);

    if (!favoritos.categorias[categoria].some(id => id.equals(lugarObjectId))) {
      favoritos.categorias[categoria].push(lugarObjectId);
      await favoritos.save();
    } else {
      console.log(`Favorito já existe: ${categoria} - ${lugarId}`);
    }

    return res.json({ 
      message: "Favorito adicionado com sucesso", 
      categorias: favoritos.categorias 
    });
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const removeFavorito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { categoria, lugarId } = req.body;

    if (!categoria || !lugarId) {
      return res.status(400).json({ error: "Categoria e lugarId são obrigatórios." });
    }

    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    const favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      return res.status(404).json({ error: "Nenhum favorito encontrado." });
    }

    const lugarObjectId = new mongoose.Types.ObjectId(lugarId);

    favoritos.categorias[categoria] = favoritos.categorias[categoria].filter(
      (id) => !id.equals(lugarObjectId)
    );

    await favoritos.save();

    return res.json({ 
      message: "Favorito removido com sucesso", 
      categorias: favoritos.categorias 
    });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};