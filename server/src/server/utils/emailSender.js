const nodemailer = require('nodemailer');
const config = require('../../../src/server/config/config');

const transporter = nodemailer.createTransport({
  service: config.development.emailService,
  auth: {
    user: config.development.emailSender,
    pass:  config.development.emailPassword
  }
});

module.exports.emailSender = (email, action) => {

  const text = `Your entry review result is: ${action}`;
  const mailOptions = {
    from: config.development.emailSender,
    to: email,
    subject: 'Entry review result',
    text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
