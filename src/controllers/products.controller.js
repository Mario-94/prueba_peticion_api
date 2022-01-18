import { getConnection } from "../database/connection";
import nodemailer from "nodemailer";
import { config } from "dotenv";
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
FROM [ABATZ].[dbo].OfertaD  As oferta
INNER JOIN [ABATZ].[dbo].Oferta as vigencia
ON(oferta.ID = vigencia.ID)
INNER JOIN [ABATZ].[dbo].Art as articulo
ON articulo.Articulo = oferta.Articulo
WHERE  vigencia.Estatus ='VIGENTE' and (vigencia.Referencia ='OFERTA PUEBLITA' or vigencia.Referencia ='OFERTA SUPER Y MOSTRADOR'
or vigencia.Referencia= 'OFERTA ALMACEN y super' or vigencia.Referencia='PUEBLITA OFERTAS')
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
                //destrucuramos los datos de esta manera para poder acceder a cada lado del apartado de nuestos datos enviados como es el firstName email por decir algunos de los que estan precentes
                const { firstName, lastName, phoneNumber, email, description } =
                        req.body.datos;

                // en esta parte hacemosun forulario para el envio del formulario de los datos al correo ya con los datos del formulario de la pagina
                let contentHTML = `
                <h1>Información del usuario</h1>
                <ul>
                <li>Name: ${firstName}</li>
                <li>lastName: ${lastName}</li>
                <li>User Email: ${email}</li>
                <li>PhoneNumber: ${phoneNumber}</li>
                </ul>
                <h2>Mensaje</h2>
                <p>${description}</p>
                `;
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                        host: process.env.HOSTNAME, //el servidor de correo al que estamos suscritos
                        port: 465, //puesto
                        secure: true, // true for 465, false for other ports
                        auth: {
                                user: process.env.USERMAIL, // El usuario que nos dio el correo
                                pass: process.env.PASSWORDMAIL, // Contraseña que pusimos para el usuario de arriba
                        },
                        tls: {
                                // do not fail on invalid certs
                                rejectUnauthorized: false,
                        },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                        from: "Pagina <contacto@abattz.com>", // El correo que lo envia
                        to: "contacto@abattz.com", // el correo destinatario
                        subject: "Prueba de mensaje", //Asunto
                        text: "enviado desde la aplicacion", // mensaje
                        html: contentHTML, // Este es el formulario que creamos arriba y acomodamos deacuerdo a nuestros datos enviados desde la pagina
                });

                console.log("enviado");

                res.send("enviado");
        } catch (error) {
                console.error(`${error}`);
        }
};
