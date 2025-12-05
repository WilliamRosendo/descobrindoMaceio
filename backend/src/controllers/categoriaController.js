import Categoria from '../models/categoria.js';

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
