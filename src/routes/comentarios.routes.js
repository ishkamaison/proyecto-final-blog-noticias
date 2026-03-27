import { Router } from 'express';
import { addComentario, getComentariosByNoticia } from '../controllers/comentarios.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/:noticia_id', getComentariosByNoticia);

router.post('/', verifyToken, addComentario);

export default router;