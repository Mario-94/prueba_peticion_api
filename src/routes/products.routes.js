import { Router } from 'express';
import { getOfertas, sendEmail } from '../controllers/products.controller';
import cors from 'cors';
const router = Router();
router.get('/ofertas', getOfertas);
router.post('/email', sendEmail);
export default router;
