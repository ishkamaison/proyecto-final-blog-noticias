import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ ok: false, msg: "Acceso denegado: Se requiere iniciar sesión" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        
        next(); 
    } catch (error) {
        return res.status(403).json({ ok: false, msg: "Token inválido o expirado" });
    }
};