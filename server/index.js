/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

const PORT = config.port || 4000;
mongoose.set('strictQuery', false);
mongoose
  .connect(config.db.local_host, {
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
  console.log('Server Started');
});
