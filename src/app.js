require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users-router.js');
const postsRouter = require('./posts-router.js');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(express.json());
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use(cors({
//   origin: 'https://job-tracker.vercel.app'
// }));

// app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.get('/hello', (req, res) => {
  res.status(200).send('Hello World!');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if(NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error);
    response = { message: error.message, error }
  }
  res.status(500).json(response);
});

module.exports = app;