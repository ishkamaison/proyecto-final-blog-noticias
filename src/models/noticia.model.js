import { query } from '../config/db.js';

export const NoticiaModel = {
    findAll: async () => {
        const sql = `
            SELECT n.*, u.nombre as autor, c.nombre as categoria,
            (SELECT COUNT(*) FROM votos WHERE noticia_id = n.id AND tipo = 'like') as likes,
            (SELECT COUNT(*) FROM votos WHERE noticia_id = n.id AND tipo = 'dislike') as dislikes
            FROM noticias n
            JOIN usuarios u ON n.autor_id = u.id
            JOIN categorias c ON n.categoria_id = c.id
            ORDER BY n.fecha_creacion DESC`;
        const { rows } = await query(sql);
        return rows;
    },

    findById: async (id) => {
        const sql = `
            SELECT n.*, u.nombre as autor, c.nombre as categoria,
            (SELECT COUNT(*) FROM votos WHERE noticia_id = n.id AND tipo = 'like') as total_likes,
            (SELECT COUNT(*) FROM votos WHERE noticia_id = n.id AND tipo = 'dislike') as total_dislikes,
            (SELECT ARRAY_AGG(u2.nombre) FROM votos v 
             JOIN usuarios u2 ON v.usuario_id = u2.id 
             WHERE v.noticia_id = n.id AND v.tipo = 'like') as usuarios_que_dieron_like
            FROM noticias n
            JOIN usuarios u ON n.autor_id = u.id
            JOIN categorias c ON n.categoria_id = c.id
            WHERE n.id = $1`;
        const { rows } = await query(sql, [id]);
        return rows[0];
    },

    create: async (titulo, contenido, imagen_url, categoria_id, autor_id) => {
        const sql = `
            INSERT INTO noticias (titulo, contenido, imagen_url, categoria_id, autor_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = await query(sql, [titulo, contenido, imagen_url, categoria_id, autor_id]);
        return rows[0];
    }
};