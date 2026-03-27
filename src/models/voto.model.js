import { query } from '../config/db.js';

export const VotoModel = {
    votar: async (usuario_id, noticia_id, tipo) => {
        const sql = `
            INSERT INTO votos (usuario_id, noticia_id, tipo)
            VALUES ($1, $2, $3)
            ON CONFLICT (usuario_id, noticia_id) 
            DO UPDATE SET tipo = EXCLUDED.tipo
            RETURNING *`;
        
        const { rows } = await query(sql, [usuario_id, noticia_id, tipo]);
        return rows[0];
    }
};