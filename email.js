const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.API_KEY || 'MAIL_GUN_API_KEY',
        domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, callback) => {
    const mailOptions = {
        from: email,
        to: 'vanisingh6612@gmail.com',
        subject,
        text
    };
    
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
           return callback(err, null);
        }else{
           return callback(null, data);
        }
    });
}

module.exports = sendMail;
