import Favoritos from "../models/favoritos.js";
import Usuario from "../models/usuarios.js";

export const getFavoritos = async (req, res) => {
  try {
    const userId = req.user.id;
    const usuario = await Usuario.findById(userId).select("favoritos");
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    
    res.json({ categorias: usuario.favoritos || {} });
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err);
    res.status(500).json({ error: "Erro interno ao buscar favoritos" });
  }
};

export const addFavorito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { categoria, lugarId  } = req.body;

    if (!categoria || !lugarId ) {
      return res.status(400).json({ error: "Categoria e lugarId são obrigatórios." });
    }

    const categoriasValidas = ["Praias", "Passeios Culturais", "Lazer"];
    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    let favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      favoritos = await Favoritos.create({ usuario_id: usuarioId });
    }

    if (!favoritos.categorias[categoria].includes(lugarId)) {
      favoritos.categorias[categoria].push(lugarId);
      await favoritos.save();
    }

    return res.json({ message: "Favorito adicionado", favoritos });
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

    const categoriasValidas = ["Praias", "Passeios Culturais", "Lazer"];
    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    const favoritos = await Favoritos.findOne({ usuario_id: usuarioId });

    if (!favoritos) {
      return res.status(404).json({ error: "Nenhum favorito encontrado." });
    }

    favoritos.categorias[categoria] = favoritos.categorias[categoria].filter(
      (id) => id !== lugarId
    );

    await favoritos.save();

    return res.json({ message: "Favorito removido", favoritos });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
