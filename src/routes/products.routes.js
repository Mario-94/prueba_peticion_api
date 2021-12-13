import { Router } from 'express';
import { getOfertas, sendEmail } from '../controllers/products.controller';
const router = Router();
router.get('/ofertas', getOfertas);
router.post('/email', sendEmail);
export default router;
