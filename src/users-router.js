const express = require('express');
const usersService = require('./usersService.js');

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter
  .route('/:userId')
  .get((req, res, next) => {
    const db = req.app.get('db');
    usersService.getUser(db, req.params.userId).then(data => res.status(200).json(data));
  });

  // add feature to edit or delete user later

usersRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const db = req.app.get('db');

    usersService.createUser(db, req.body)
    .then(data => res.status(201).json(data[0]));

    // res.status(201).json(usersService.createUser(db, req.body).then(data => data));
  });

module.exports = usersRouter;