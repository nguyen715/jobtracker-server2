const knex = require('knex');
const app = require('../src/app');
const supertest = require('supertest');

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
    return db.raw('TRUNCATE users, posts RESTART IDENTITY CASCADE');
  })

  beforeEach('Seed the tables', () => {
    return db('users').insert({username: 'Miki', password: 'mouse'});
  })

  it('gets user with id==1', () => {
    const data = {id: 1, username: 'Miki', password: 'mouse'};

    return supertest(app)
    .get('/users/1')
    .expect(200, data)
  })

})