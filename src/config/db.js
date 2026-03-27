import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const query = (text, params) => pool.query(text, params);

pool.on('connect', () => {
    console.log('Conexión exitosa a PostgreSQL (Blog M9)');
});

pool.on('error', (err) => {
    console.error('Error inesperado en la base de datos:', err);
});