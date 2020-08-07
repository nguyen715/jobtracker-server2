const express = require('express');
const authService = require('./auth-service.js');

const authRouter = express.Router();
const bodyParser = express.json();

authRouter.route('/login').post(bodyParser, (req, res, next) => {
  const { username, password } = req.body;
  const loginUser = { username, password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res
        .status(400)
        .json({ error: `Missing '${key}' in request body` });

  authService.getUserWithUserName(req.app.get('db'), loginUser.username)
    .then((dbUser) => {
      if (!dbUser)
        return res
          .status(400)
          .json({ error: 'Incorrect Username or Password' });

      return authService.comparePasswords(loginUser.password, dbUser.password)
        .then((compareMatch) => {
          if (!compareMatch)
            return res
              .status(400)
              .json({ error: 'Incorrect Username or Password' });
          
          const sub = dbUser.username;
          const payload = { userId: dbUser.id };

          res.send({
            authToken: authService.createJwt(sub, payload),
            userId: payload.userId
          });
        });   
    })
    .catch(next);
});

module.exports = authRouter;