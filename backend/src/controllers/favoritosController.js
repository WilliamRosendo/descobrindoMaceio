import Favoritos from "../models/Favoritos.js";

export const obterFavoritos = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    let favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      favoritos = await Favoritos.create({
        usuario_id: usuarioId,
      });
    }

    return res.json(favoritos);
  } catch (error) {
    console.error("Erro ao obter favoritos:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const adicionarFavorito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { categoria, itemId } = req.body;

    if (!categoria || !itemId) {
      return res.status(400).json({ error: "Categoria e itemId são obrigatórios." });
    }

    const categoriasValidas = ["Praias", "Passeios Culturais", "Lazer"];
    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    let favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      favoritos = await Favoritos.create({ usuario_id: usuarioId });
    }

    if (!favoritos.categorias[categoria].includes(itemId)) {
      favoritos.categorias[categoria].push(itemId);
      await favoritos.save();
    }

    return res.json({ message: "Favorito adicionado", favoritos });
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const removerFavorito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { categoria, itemId } = req.body;

    if (!categoria || !itemId) {
      return res.status(400).json({ error: "Categoria e itemId são obrigatórios." });
    }

    const categoriasValidas = ["Praias", "Passeios Culturais", "Lazer"];
    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    const favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      return res.status(404).json({ error: "Nenhum favorito encontrado." });
    }

    favoritos.categorias[categoria] = favoritos.categorias[categoria].filter(
      (id) => id !== itemId
    );

    await favoritos.save();

    return res.json({ message: "Favorito removido", favoritos });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
