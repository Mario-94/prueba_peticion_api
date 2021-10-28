import express from 'express'
import config from './config'
import getOfertas from './routes/products.routes'
import cors from 'cors'

const app = express()
const whitelist = ['http://localhost:3000' ]
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
app.use(cors(corsOptions))
app.set('port', config.port)
app.use(getOfertas);


export default app;
