const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');
const hash = require('object-hash');


describe('Posts endpoints', () => {
  let db;

  before('Make a connection', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    })

    app.set('db', db);
  })

  after('Destroy the connection', () => db.destroy());

  afterEach('Truncate the tables', () => {
    return db.raw('TRUNCATE posts RESTART IDENTITY CASCADE');
  })

  beforeEach('Seed the tables', () => {
    const token1 = hash('miki@miki.com');
    const token2 = hash('wesley@wesley.com');

    return db('posts').insert(
      [
        {
          title: 'test title',
          url: 'https://www.testurl.com',
          location: 'Columbus',
          email: 'miki@miki.com',
          token: token1
        },
        {
          title: 'test title 2',
          url: 'https://www.testurl2.com',
          location: 'Miami',
          email: 'wesley@wesley.com',
          token: token2
        }
      ])
  })

  describe('GET all posts belonging to email miki@miki.com', () => {
    it('returns the first post with test title, testurl, etc, but not the second post', () => {
      return supertest(app)
             .get(`/posts/email/miki@miki.com`)
             .expect(200)
    })
  })

  describe('DELETE post with postId of 1', () => {
    it('returns the database, showing the first post deleted and second post still there', () => {
      return supertest(app)
             .delete('/posts/1')
             .expect(200)
      
    })
  })

  describe('POST new post to database', () => {
    it('returns the database with new post added', () => {
      return supertest(app)
             .post(`/posts/`)
             .send({
               title: "testtitle",
               url: "testurl@testurl.com",
               email: "wesleymiki@wesleymiki.com"
             })
             .expect(201)
      
    })
  })

  describe('GET token belonging to email miki@miki.com', () => {
    it('returns the token belonging to miki@miki.com', () => {
      return supertest(app)
             .get(`/token/miki@miki.com`)
             .expect(200)
      
    })
  })
})