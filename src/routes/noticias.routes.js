import { Router } from 'express';
import { 
    getAllNoticias, 
    getNoticiaById, 
    createNoticia 
} from '../controllers/noticias.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js'; 
import { registrarVoto } from '../controllers/votos.controller.js';

const router = Router();

router.get('/', getAllNoticias);
router.get('/:id', getNoticiaById);

router.post('/', verifyToken, createNoticia); 
router.post('/:id/votar', verifyToken, registrarVoto);

export default router;