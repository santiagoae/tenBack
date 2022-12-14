const { request, response } = require('express');
const nodeMailer = require('nodemailer');

const envioCorreo = (req=request, resp=response) => {
    let body = req.body;

    let config = nodeMailer.createTransport({
        hosts:'smtp-relay.gmail.com',
        port: 587,
        auth:{
            user: 'kawadsign@gmail.com',
            pass: 'Delforro123.'
        }
    });

    const options = {
        from: 'programacion',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje
    };

    config.sendMail(options, function(error, result){
        if (error) {
            return resp.json({
                ok: false,
                msg: error
            })
        }
        return resp.json({
            ok: true,
            msg: result
        })
    })

    module.exports = {
        envioCorreo
    }
}