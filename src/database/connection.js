import sql from 'mssql';
import {config} from 'dotenv'
config();
const dbSettings  = {
    user: process.env.USE,
    password: process.env.PASS,
    server: process.env.SERVERNAME ,// debo cambiarlas a el archivo .env, para cuando lo aplique en el de git
    database: process.env.BASE,
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}
export async function getConnection(){
    try {
        const pool= await sql.connect(dbSettings)
    return pool;
        
    } catch (error) {
        console.log(error);
    }
  
}

