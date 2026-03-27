import { query } from '../config/db.js';

export const ComentarioModel = {
    create: async (contenido, usuario_id, noticia_id) => {
        const sql = `
            INSERT INTO comentarios (contenido, usuario_id, noticia_id) 
            VALUES ($1, $2, $3) 
            RETURNING *`;
        const { rows } = await query(sql, [contenido, usuario_id, noticia_id]);
        return rows[0];
    },

    findByNoticia: async (noticia_id) => {
        const sql = `
            SELECT c.id, c.contenido, c.fecha_creacion, u.nombre AS autor
            FROM comentarios c
            JOIN usuarios u ON c.usuario_id = u.id
            WHERE c.noticia_id = $1
            ORDER BY c.fecha_creacion DESC`;
        const { rows } = await query(sql, [noticia_id]);
        return rows;
    }
};