/*
postData should be a JS object, e.g.

{
  title: "Cool job listing",
  location: "Los Angeles",
  url: "https://www.indeed.com/really-cool-job",
  notes: "I really like this job",
  rating: 8,
  userId: 75
}
*/

const postsService = {
  createPost(knex, postData) {
    return knex('posts').insert(postData).then(() => {});
    // const { title, url, location, notes, rating, userId };
    // knex('posts').insert({
    //   title: title,
    //   url: url,
    //   location: location,
    //   notes: notes,
    //   rating: rating,
    //   user_id: userId
    
    // does knex('posts').insert(postData) work??
  },

  getPost(knex, postId) {

  },

  editPost(knex, id, postData) {

  },

  deletePost(knex, postId) {

  }
}

module.exports = postsService;

/*
create new post

get post (to display in single post page?)

edit post

delete post
*/