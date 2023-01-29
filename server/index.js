/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 4000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.LOCAL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('database connected');
  })
  .catch((err) => {
    throw err;
  });
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Sarver Started');
});
