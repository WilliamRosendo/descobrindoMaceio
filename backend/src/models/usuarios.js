import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true
  },
  data_cadastro: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Usuario", userSchema, "usuarios");
