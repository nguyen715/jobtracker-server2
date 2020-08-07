const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/;
const xss = require('xss');
const bcrypt = require('bcryptjs');

const usersService = {
  createUser (knex, userData) {
    return knex('users').insert(userData).returning('*').then(([user]) => user);
  },

  getUser(knex, userId) {
    return knex('users').select('*').where('id', userId).first();
  },

  deleteUser(knex, userId) {

  },

  getUserPosts(knex, userId) {
    // check that the where arguments are formatted correctly
    return knex('posts').select('*').where({user_id: userId});
  },

  createPost(knex, userId, postData) {
    return knex('posts').insert(postData).returning('*');
  },

  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be shorter than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
      return 'Password must contain an uppercase, lowercase, and number';
    }
    return null;
  },

  hasUserWithUsername(knex, username) {
    return knex('users')
      .where({ username })
      .first()
      .then((user) => !!user);
  },

  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
      password: xss(user.password)
    }
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  }
};

module.exports = usersService;