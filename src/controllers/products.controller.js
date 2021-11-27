import { getConnection } from '../database/connection';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
export const getOfertas = async (req, res) => {
        try {
                const pool = await getConnection();
                const result = await pool.request().query(`
                SELECT
                /*En esta parte pondremos las columnas de la tabla ofertasD*/
                        oferta.ID,
                        oferta.Articulo,
                        oferta.Unidad as UnidadCompra,
                        CostoBase,
                        /*En esta parte pondremos las columnas de la tabla Oferta donde tenemos el estatus de VIGENCIA*/
                        --vigencia.Articulo,
                        vigencia.Referencia,
                        /*vigencia.Unidad,*/
                        --vigencia.Empresa,
                        vigencia.MovID, --este es para saber quien fue el que dio de alta la oferta 
                        vigencia.Estatus,
                        /*En esta parte pondremos las columnas de la tabla Articulos de esta traemos la descripcion y la linea a la que pertence*/
                        articulo.Descripcion1,
                        articulo.Linea,
                        articulo.Unidad as UnidadVenta
                FROM [${process.env.TABLA}].[${process.env.DBO}].OfertaD  As oferta
                INNER JOIN [${process.env.TABLA}].[${process.env.DBO}].Oferta as vigencia
                ON(oferta.ID = vigencia.ID)
                INNER JOIN [${process.env.TABLA}].[${process.env.DBO}].Art as articulo
                ON articulo.Articulo = oferta.Articulo
                WHERE  vigencia.Estatus ='VIGENTE' and (vigencia.Referencia ='mayoreo super' or vigencia.Referencia ='pueblita'
                or vigencia.Referencia= 'mostrador y super' or vigencia.Referencia='PUEBLITA OFERTAS')
                -- falta expecificar  y estandarizar las referencias and (vigencia.Referencia ='pueblita' OR vigencia.Referencia ='mostrador')
                order by oferta.ID asc`);
                const a = result.recordset;
                // no se ocupa para que no se alente el api console.log(result.recordset);
                res.json(a);
        } catch (error) {
                res.status(500);
                res.send(error.message);
        }
};

//esta es la configuracion para enviar correos de queja
export const sendEmail = async (req, res) => {
        try {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                        host: process.env.HOSTNAME, //el servidor de correo al que estamos suscritos
                        port: 587, //puesto
                        secure: false, // true for 465, false for other ports
                        auth: {
                                user: process.env.USERMAIL, // El usuario que nos dio el correo
                                pass: process.env.PASSWORDMAIL, // Contraseña que pusimos para el usuario de arriba
                        },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                        from: '"Fred Foo " <contacto@abattz.com>', // El correo que lo envia
                        to: 'mags9415@gmail.com', // el correo destinatario
                        subject: 'Hello ', //Asunto
                        text: 'Hello world?', // mensaje
                        // html: '<b>Hello world?</b>', // html body
                });
                res.send('enviado');
        } catch (error) {
                console.error(`${error}`);
        }
};
