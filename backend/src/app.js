import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar Mongo:", err));

app.use("/api", routes);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Caminho correto para o dist
const distPath = path.join(__dirname, "../dist");

// Servir arquivos estáticos
app.use(express.static(distPath));

// Qualquer rota que não seja /api vai retornar o index.html do frontend
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
