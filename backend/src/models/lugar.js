import mongoose from "mongoose";

const lugarSchema = new mongoose.Schema({
  nome_local: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  fotos: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "Deve haver pelo menos uma foto."
    }
  },
  localizacao: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  endereco: {
    type: String,
    required: true
  },
  data_cadastro: {
    type: Date,
    default: Date.now
  }
});

// índice geoespacial
lugarSchema.index({ localizacao: "2dsphere" });

export default mongoose.model("Lugar", lugarSchema, "lugares");
