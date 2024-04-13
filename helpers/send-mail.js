const nodemailer = require('nodemailer');
const config = require('../config.js');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // smtp server adresi, hotmail smtp, gmail smtp 
    port: 587,
    secure: false, // 465 numaralı port için `true`, diğer tüm portlar için `false` kullanın
    tls: {
        ciphers: 'SSLv3',
    }, 
    auth: {
        user: config.email.mail,
        pass: config.email.password,
    }
})

module.exports = transporter;