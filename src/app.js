require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const { NODE_ENV } = require('./config');
const usersRouter = require('./users-router.js');
const postsRouter = require('./posts-router.js');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use(cors({
//   origin: 'https://job-tracker.vercel.app'
// }));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.get('/token/:email', (req, res) => {
  res.status(200).send(`${bcrypt.hash(req.params.email, 12)}`)
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