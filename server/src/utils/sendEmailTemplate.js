const nodemailer = require('nodemailer');



const sendEmail = (user, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
            user: process.env.EMAIL_HOST,
            pass: process.env.EMAIL_PASSWORD_HOST
        }
    }
);

    const mailOptions = {
        from: `Anonimo <${process.env.EMAIL_HOST}>`,
        to: user.email,
        subject: subject,
        html: html
        
    };
    
    transporter.sendMail(mailOptions,  (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { 
    sendEmail
}
