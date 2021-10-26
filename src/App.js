import express from 'express'
import config from './config'
import getOfertas from './routes/products.routes'
import cors from 'cors';
const app = express()

//settings 
app.set('port', config.port)
app.use(getOfertas,);
// app.use(cors(
//     confi.application.cors.server
// ));
export default app;
