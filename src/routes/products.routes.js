import { Router } from 'express';
import { getOfertas, sendEmail,holaMundo	 } from '../controllers/products.controller';
const router = Router();
router.get('/',holaMundo)
router.get('/ofertasAlmacen', getOfertas);
router.post('/email', sendEmail);
export default router;
