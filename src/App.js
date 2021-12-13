import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import getOfertas from './routes/products.routes';
import cors from 'cors';
const app = express();
const whitelist = ['http://localhost:3000'];
//Esta se utilizara para el cuando subamos la api
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
//settings
// Esta es la linea original la  otra es de prueba
//app.use(cors(corsOptions))
// para pruebas pse pondra la siguiente linea
app.use(cors());
app.set('port', config.port);
//Esta es la parte de correo
/*en esta parte debemos checar que esta parte es la que se encarga de recibir archivos desde un formulario enviado desde http
para eso es la primera linea*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //este es para una aplicacion echa como en react js

app.use(getOfertas);

export default app;
