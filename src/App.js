import express from 'express'
import config from './config'
import getOfertas from './routes/products.routes'
import cors from 'cors'
const app = express()
const whitelist = ['http://localhost:3000' ]
//Esta se utilizara para el cuando subamos la api
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  } 
//settings 
// Esta es la linea original la  otra es de prueba
//app.use(cors(corsOptions))
// para pruebas pse pondra la siguiente linea
app.use(cors())
app.set('port', config.port)
app.use(getOfertas);
//Esta es la parte de correo
app.use(express.urlencoded({extended:false}))
app.use(express.json())//este es para una aplicacion echa como en react js

export default app;
