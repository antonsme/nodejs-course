const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// Константа с фиксированным email-адресом
const recipientEmail = "antonsmelkv@gmail.com";

// Функция отправки сообщения
const send = (message) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: recipientEmail, 
        pass: "anton111_",
      },
    })
  );

  // Опции для отправки письма
  const mailOptions = {
    from: recipientEmail,
    to: recipientEmail,
    subject: "Тема сообщения",
    text: message,
    html: `<h1>${message}</h1>`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Ошибка отправки: ${error}`);
    } else {
      console.log(`Сообщение отправлено: ${info.response}`);
    }
  });
};

module.exports = send;
