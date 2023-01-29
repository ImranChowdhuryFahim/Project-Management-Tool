require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  token_secret: process.env.TOKEN_SECRET,
  db: {
    host: process.env.CONNECTION_STRING,
    local_host: process.env.LOCAL_MONGO,
  },
  email_sender: process.env.EMAIL_SENDER,
  sendGrid_api_key: process.env.SENDGRID_API_KEY,
  email_password: process.env.EMAIL_PASS,
};
