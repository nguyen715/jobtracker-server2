const express = require('express');
const postsService = require('./posts-service.js');

const postsRouter = express.Router();

postsRouter
  .route('/:postId')
  .delete((req, res) => {
    const db = req.app.get('db');
    postsService.deletePost(db, req.params.postId)
    .then(res.send(200));
  });

postsRouter  
  .route('/?email=/:email')
  .get((req, res) => {
    const db = req.app.get('db');
    res.status(200).send(`${req.params.email}`);
    if (req.params.email.length > 0) {
      const email = req.params.email;
      // postsService.getPostsByEmail(db, email)
      // .then(data => res.status(200).json(data));
    }
    else if (req.params.token.length > 0) {
      const token = req.params.token;
      postsService.getPostsByToken(db, token)
      .then(data => res.status(200).json(data));
    }
    else
      res.status(400).send('Valid email or token is required.');
  })
  .post(express.json(), (req, res) => {
    const db = req.app.get('db');
    const sanitizedPost = postsService.sanitizePost(req.body);
    sanitizedPost.token = postsService.hashEmail(req.params.email);

    postsService.insertPost(db, sanitizedPost)
    .then(data => res.status(201).json(data));
  });

module.exports = postsRouter;