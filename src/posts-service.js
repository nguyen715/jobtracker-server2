const xss = require('xss');

const postsService = {

  sanitizePost(postData) {
    console.log(postData);
    console.log(xss(postData.rating));
    return {
      title: xss(postData.title),
      url: xss(postData.url),
      location: xss(postData.location),
      notes: xss(postData.notes),
      rating: xss(postData.rating || 1),
      email: xss(postData.email),
    }
  },

  insertPost(knex, postData) {
    console.log(postData);
    return knex('posts').insert(postData).then((data) => data);
  },

  getPostsByEmail(knex, email) {
    return knex('posts').where('email', email).then((data) => data);
  },

  getPostsByToken(knex, token) {
    return knex('posts').where('token', token);
  },

  deletePost(knex, postId) {
    return knex('posts').where('id', postId).del().then(() => {});
  }
}

module.exports = postsService;