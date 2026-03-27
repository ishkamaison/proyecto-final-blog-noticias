import { query } from '../config/db.js';

export const UsuarioModel = {
    create: async (nombre, email, password) => {
        const sql = 'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email';
        const { rows } = await query(sql, [nombre, email, password]);
        return rows[0];
    },

    findByEmail: async (email) => {
        const sql = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await query(sql, [email]);
        return rows[0];
    }
};