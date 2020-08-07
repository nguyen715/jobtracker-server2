const app = require('./app.js');
const knex = require('knex');

const { PORT, DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});