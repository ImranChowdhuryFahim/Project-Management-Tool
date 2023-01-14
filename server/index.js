const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Management Tool',
      version: '1.0.0',
      description: '',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.CONNECTION_STRING, {
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
