require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER_NAME,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_USER_PASSWORD,
    database: process.env.POSTGRES_USER_DATABASE
  }
});

const year = new Date().getFullYear();

const user = knex.returning('name').select('name').from('users').withSchema('client')
  .then(data => console.log(data));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Znoobtube', year: year, name: user[{}] });
  console.log(user);
});

module.exports = router;
