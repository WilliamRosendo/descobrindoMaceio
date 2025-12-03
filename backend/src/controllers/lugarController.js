import Lugar from "../models/lugar.js";
import Categoria from "../models/categoria.js";
import mongoose from "mongoose";

export const listarLugares = async (req, res) => {
  try {
    const lugares = await Lugar.find().populate("categoria", "nome_categoria");
    res.json(lugares);
  } catch (err) {
    console.error("Erro ao listar lugares:", err);
    res.status(500).json({ error: "Erro ao listar lugares" });
  }
};

export const listarLugaresPorCategoria = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID da categoria inválido" });
  }

  try {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const lugares = await Lugar.find({ categoria: categoria._id });

    res.json(lugares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar lugares" });
  }
};

export const buscarLugarPorId = async (req, res) => {
    try {
        const lugar = await Lugar.findById(req.params.id);

        if (!lugar) {
            return res.status(404).json({ error: "Lugar não encontrado" });
        }

        res.json(lugar);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar o lugar" });
    }
};
