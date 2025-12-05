import mongoose from "mongoose";

const FavoritosSchema = new mongoose.Schema(
  {
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      unique: true, 
    },

    categorias: {
      Praias: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Lugar",
        default: [],
        required: true,
      },
      "Passeios Culturais": {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Lugar",
        default: [],
        required: true,
      },
      Lazer: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Lugar",
        default: [],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Favoritos", FavoritosSchema, "favoritos");
