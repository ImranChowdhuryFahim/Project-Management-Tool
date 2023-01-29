/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');
const config = require('../../config');
const {
  getAccountCreatedHtml,
} = require('./html-generator-service');

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user: config.email_sender, // generated ethereal user
    pass: config.email_password, // generated ethereal password
  },
});

const sendAccountCreatedEmail = async ({
  userName, email,
}, cb) => {
  const mailoptions = {
    from: '"Project Management Tool(PMT)" <imran.cuet.cse17@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Successfull account creation', // Subject line
    html: getAccountCreatedHtml(userName),
  };

  await transporter.sendMail(mailoptions, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = {
  sendAccountCreatedEmail,
};
