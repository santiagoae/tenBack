const express = require('express');
const app = express();

let envio = require('../controllers/correoController');

app.post('/envio', function(req, res){
    envio.envioCorreo
});

module.exports = app;