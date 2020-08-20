const bcrypt = require('bcryptjs');
const xss = require('xss');

const postsService = {
  hashEmail(email) {
    return bcrypt.hash(email, 12);    
  },

  sanitizePost(postData) {
    return {
      title: xss(postData.title),
      url: xss(postData.url),
      location: xss(postData.location),
      notes: xss(postData.notes),
      rating: xss(postData.rating),
      email: xss(postData.email),
    }
  },

  insertPost(knex, postData) {
    return knex('posts').insert(postData).then((data) => data);
  },

  getPostsByEmail(knex, email) {
    return knex('posts').where('email', email).then((data) => data);
  },

  getPostsByToken(knex, token) {
    return knex('posts').where('token', token);
  },

  editPost(knex, id, postData) {
    // Wouldn't that be nice...
  },

  deletePost(knex, postId) {
    return knex('posts').where('id', postId).del().then(() => {});
  }
}

module.exports = postsService;