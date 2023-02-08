const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.sendConfirmationEmail = async (name, receiverEmail, confirmationCode) => {
    const emailContent = {
        from: process.env.MAIL_USER,
        to: receiverEmail,
        subject: 'Confirmação da conta Álbum',
        html: `<h1>Confirmação de E-mail</h1>
        <h2>Olá, ${name}</h2>
        <p>Para conseguir utilizar sua conta Álbum, é necessário que você confirme seu e-mail <a href=${process.env.CONFIRMATION_LINK + confirmationCode}>clicando aqui</a></p>
        <p>Este é um e-mail automático, <b>não responda este e-mail</b>.</p>
        `
    }
    console.log('Sending mail to: ' + receiverEmail);

    try {
        await transporter.sendMail(emailContent);
    } catch (err) {
        console.error(err);
    }
}