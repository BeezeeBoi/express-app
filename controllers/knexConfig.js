require('dotenv').config();

module.exports = knexConfig = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER_NAME,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_USER_PASSWORD,
    database: process.env.POSTGRES_USER_DATABASE
  }
});