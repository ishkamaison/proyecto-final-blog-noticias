import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuarioModel } from '../models/usuario.model.js';

export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body; 

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const nuevoUsuario = await UsuarioModel.create(nombre, email, hashedPassword);
        res.status(201).json({ ok: true, data: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: "Error al registrar (el email ya existe)" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await UsuarioModel.findByEmail(email);

        if (!usuario) return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ ok: true, token, usuario: { nombre: usuario.nombre } });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error en el servidor" });
    }
};