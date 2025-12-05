import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nome_categoria: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

export default mongoose.model("Categoria", categoriaSchema, "categorias");