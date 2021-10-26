import {Router} from 'express';
import {getOfertas} from '../controllers/products.controller'
import cors from 'cors'
const router=Router();
const confi = {
    application: {
        cors: {
            server: [
                {
                    origin: "http://localhost:3000/",
                    credentials: true,
                }
            ]
        }
    }
}
router.get('/products',getOfertas,cors(confi.application.cors.server));

export default router;