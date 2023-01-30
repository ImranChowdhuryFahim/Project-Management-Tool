const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const userRouter = require('./routes/user.route');
const workspaceRouter = require('./routes/workspace.route');
const projectRouter = require('./routes/project.route');
const boardRouter = require('./routes/board.route');
const isseuRouter = require('./routes/issue.route');
const columnRouter = require('./routes/column.route');

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
  apis: ['./routes/*.js', './database/models/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(userRouter);
app.use(workspaceRouter);
app.use(projectRouter);
app.use(boardRouter);
app.use(isseuRouter);
app.use(columnRouter);

module.exports = app;
