import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/auth.routes.js';
import noticiasRoutes from './src/routes/noticias.routes.js';
import comentariosRoutes from './src/routes/comentarios.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/api/v1/auth', authRoutes);           
app.use('/api/v1/noticias', noticiasRoutes);   
app.use('/api/v1/comentarios', comentariosRoutes); 

app.use((req, res) => {
    res.status(404).json({ ok: false, msg: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
     Servidor encendido con éxito
     Local:   http://localhost:${PORT}
     Backend: API REST lista para el Módulo 9
    `);
});