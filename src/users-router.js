const express = require('express');
const usersService = require('./users-service.js');
const { hasUserWithUsername } = require('./users-service.js');

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
  .post(jsonParser, (req, res, next) => {
    const db = req.app.get('db');
    const id = req.params.userId;

    usersService.createPost(db, id, req.body)
    .then(data => res.status(201).json(data));
  })

// http://localhost:8000/users/1
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
    const { password, username } = req.body;

    for(const field of ['username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    const passwordError = usersService.validatePassword(password);
    
    if (passwordError) return res.status(400).json({ error: passwordError });
    usersService.hasUserWithUsername(req.app.get('db'), username)
      .then((hasUserWithUsername) => {
        if(hasUserWithUsername)
          return res.status(400).json({ error: 'Username taken' });

        return usersService.hashPassword(password).then((hashedPassword) => {
          const newUser = {
            username,
            password: hashedPassword
          };

          return usersService.createUser(req.app.get('db'), newUser).then(
            (user) => {
              res
                .status(201)
                .location(
                  path.posix.join(`http://localhost:8000/my-jobs`)
                )  
            }
          )
        })
      })

    usersService.createUser(db, req.body)
    .then(data => res.status(201).json(data[0]));

    // res.status(201).json(usersService.createUser(db, req.body).then(data => data));
  });

module.exports = usersRouter;