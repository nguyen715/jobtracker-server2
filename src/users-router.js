const express = require('express');
const usersService = require('./usersService.js');

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter
  .route('/:userId/posts')
  // get all posts belonging to user with id = userId
  .get((req, res) => {
    const db = req.app.get('db');
    const id = req.params.userId;
    usersService.getUserPosts(db, id)
    .then(data => res.status(200).json(data));
  })
  // create new post belonging to user with id = userId
  .post((req, res) => {
    const db = req.app.get('db');
    const id = req.params.userId;
    usersService.createPost(db, id, req.body)
    .then(data => res.status(201).json(data));
  })


// select user with id == userId
usersRouter
  .route('/:userId')
  .get((req, res) => {
    const db = req.app.get('db');
    const id = req.params.userId;
    usersService.getUser(db, id)
    .then(data => res.status(200).json(data));
  });

  // add feature to edit or delete user later

// create new user
usersRouter
  .route('/')
  .post(jsonParser, (req, res) => {
    const db = req.app.get('db');

    usersService.createUser(db, req.body)
    .then(data => res.status(201).json(data[0]));

    // res.status(201).json(usersService.createUser(db, req.body).then(data => data));
  });

module.exports = usersRouter;