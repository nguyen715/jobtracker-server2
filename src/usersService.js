const usersService = {
  createUser (knex, userData) {
    return knex('users').insert(userData).returning('*');
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
  }
};

module.exports = usersService;