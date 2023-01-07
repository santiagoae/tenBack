const express = require('express');
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/envio', async (req, res) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.titan.email',
        port: 587,
        secure: false,
        auth:{
            user: 'citas@tensaludoral.com',
            pass: 'citasadmin2022'
        }
        // auth:{
        //     user: 'kawadsign@gmail.com',
        //     pass: 'ogftlaunzksdayew'
        // }
    })

    let info = await transporter.sendMail({
        from: 'citas@tensaludoral.com',
        subject: req.body.service,
        to: 'citas@tensaludoral.com',
        // text: JSON.stringify(req.body)
        text:`Enviado desde el sitio web oficial de Ten Salud Oral.
        Nombre del usuario: ${req.body.name}
        Correo del usuario: ${req.body.email}
        Telefono de contacto: ${req.body.phone}
        Servicio que desea: ${req.body.service}
        Fecha tentantiva a evaluar: ${req.body.tentative_date}
        ______________________________________________________
        Reenvia un correo al usuario para confirmarle su cita, gracias.`,
    })

    if (info) {
        res.send(JSON.parse('{"response": "Tu cita esta siendo evaluada"}'));
    }else{
        res.send(JSON.parse('{"error": "problemas al enviar tu peticion"}'));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`escuchando por el puerto ${PORT}`);
})