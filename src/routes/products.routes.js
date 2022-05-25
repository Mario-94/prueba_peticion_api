import { Router } from 'express';
import { getOfertas, sendEmail } from '../controllers/products.controller';
const router = Router();
router.get('/ofertasAlmacen', getOfertas);
router.post('/email', sendEmail);
export default router;
