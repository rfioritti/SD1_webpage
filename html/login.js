const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seterisparibus2019@gmail.com', // Reemplaza con tu dirección de correo electrónico
        pass: 'telematica18' // Reemplaza con tu contraseña de correo electrónico
    }
});

// Ruta para enviar el código de verificación por correo electrónico
app.post('/sendCode', (req, res) => {
    const email = req.body.email;
    const verificationCode = randomstring.generate(8); // Genera un código de 8 dígitos

    const mailOptions = {
        from: 'seterisparibus2019@gmail.com',
        to: email,
        subject: 'Código de verificación para SD2',
        text: `Tu código de verificación para ingersar a SafeDrive2.uy es: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el código de verificación por correo electrónico.');
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send('Código de verificación enviado por correo electrónico.');
        }
    });
});

// Ruta para verificar el código de verificación
app.post('/verifyCode', (req, res) => {
    const code = req.body.code;
    // Aquí puedes realizar la lógica para verificar el código
    // Por ejemplo, puedes compararlo con un código generado previamente y almacenado en tu base de datos

    // Simplemente para este ejemplo, asumimos que el código es correcto si es '12345678'
    if (code === '12345678') {
        res.status(200).send('Código de verificación válido.');
    } else {
        res.status(400).send('Código de verificación inválido.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
