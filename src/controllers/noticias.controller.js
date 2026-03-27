import { NoticiaModel } from '../models/noticia.model.js';

export const getAllNoticias = async (req, res) => {
    try {
        const noticias = await NoticiaModel.findAll();
        res.json({ ok: true, data: noticias });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al obtener noticias" });
    }
};

export const getNoticiaById = async (req, res) => {
    try {
        const { id } = req.params; 
        const noticia = await NoticiaModel.findById(id);
        if (!noticia) return res.status(404).json({ ok: false, msg: "Noticia no encontrada" });
        res.json({ ok: true, data: noticia });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

export const createNoticia = async (req, res) => {
    try {
        const { titulo, contenido, categoria, imagen_url } = req.body;
        const autor_id = req.user.id; 

        if (titulo.length > 60) return res.status(400).json({ ok: false, msg: "Título demasiado largo (máx 60)" });
        if (contenido.length > 4000) return res.status(400).json({ ok: false, msg: "Contenido demasiado largo (máx 4000)" });

        const categoriasMap = { "Turismo": 1, "Tecnología": 2, "Cultura": 3, "Deportes": 4 };
        const categoria_id = categoriasMap[categoria] || 1;

        const nuevaNoticia = await NoticiaModel.create(titulo, contenido, imagen_url, categoria_id, autor_id);
        res.status(201).json({ ok: true, data: nuevaNoticia });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error al crear la noticia" });
    }
};