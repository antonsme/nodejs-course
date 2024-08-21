const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport")




const user = "antonsmelkv@gmail.com"
const password = "anton111_"


send = (message) => {
    const transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: user,
            pass: password
        }
    }));



    const multiOptions = {
        from: user,
        to: 'recipient@example.com',
        subject: 'Тема сообщения',
        text: { message },
        html: '<b>HTML-содержимое сообщения</b>'
    }

    transporter.sendMail(multiOptions, (error, info) => {
        error ? console.log(error) : console.log(`info : ${info.response}`)
    });





}

send("hello")

module.exports = send