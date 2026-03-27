import { VotoModel } from '../models/voto.model.js';

export const registrarVoto = async (req, res) => {
    try {
        const { id: noticia_id } = req.params;
        const { tipo } = req.body; // 'like' o 'dislike'
        const usuario_id = req.user.id; // Viene del middleware verifyToken

        if (!noticia_id || !tipo) {
            return res.status(400).json({ ok: false, msg: "Faltan datos para votar" });
        }

        const voto = await VotoModel.votar(usuario_id, noticia_id, tipo);
        
        res.json({ 
            ok: true, 
            msg: "Voto registrado con éxito",
            data: voto 
        });
    } catch (error) {
        console.error("ERROR EN VOTAR:", error); // Esto aparecerá en tu terminal de VS Code
        res.status(500).json({ ok: false, msg: "Error interno al procesar el voto" });
    }
};