import { ComentarioModel } from '../models/comentario.model.js';

export const addComentario = async (req, res) => {
    try {
        const { contenido, noticia_id } = req.body;
        const usuario_id = req.user.id; 

        const nuevoComentario = await ComentarioModel.create(contenido, usuario_id, noticia_id);
        res.status(201).json({ ok: true, data: nuevoComentario });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al publicar comentario" });
    }
};

export const getComentariosByNoticia = async (req, res) => {
    try {
        const { noticia_id } = req.params;
        const comentarios = await ComentarioModel.findByNoticia(noticia_id);
        res.json({ ok: true, data: comentarios });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error al obtener comentarios" });
    }
};