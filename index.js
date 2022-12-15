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
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'kawadsign@gmail.com',
            pass: 'ogftlaunzksdayew'
        }
    })

    let info = await transporter.sendMail({
        from: 'kawadsign@gmail.com',
        subject: req.body.service,
        to: 'kawadsign@gmail.com',
        text: JSON.stringify(req.body)
    })

    if (info) {
        res.send(JSON.parse('{"response": "Tu cita esta siendo evaluada"}'));
    }else{
        res.send(JSON.parse('{"error": "problemas al enviar tu peticion"}'));
    }
});

app.listen('3000', () => {
    console.log('escuchando');
})