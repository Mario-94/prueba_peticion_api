import { getConnection } from '../database/connection'
export const getOfertas = async (req, res) => {
        try {
                const pool = await getConnection();
                const result = await pool.request().query("SELECT TOP(10) Descripcion1,Linea,Unidad FROM Art");
                const a = result.recordset;
                console.log(result.recordset);
                res.json(a)
        } catch (error) {
                res.status(500);
                res.send(error.message);
        }
}
