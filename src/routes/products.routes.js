import {Router} from 'express';
import {getOfertas} from '../controllers/products.controller'
import cors from 'cors'
const router=Router();


router.get('/products',getOfertas);

export default router;