import Lugar from "../models/lugar.js";
import Categoria from "../models/categoria.js"; // necessário para validar categoria
import mongoose from "mongoose";

export const listarLugares = async (req, res) => {
  try {
    const lugares = await Lugar.find();
    res.json(lugares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar lugares" });
  }
};

export const listarLugaresPorCategoria = async (req, res) => {
  const { id } = req.params;

  // Valida se é ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID da categoria inválido" });
  }

  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    // Buscar lugares usando o ObjectId da categoria
    const lugares = await Lugar.find({ categoria: categoria._id });

    res.json(lugares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar lugares" });
  }
};
