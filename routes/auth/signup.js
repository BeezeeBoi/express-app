const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const db = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_USER_PASSWORD,
    database: process.env.POSTGRES_USER_DATABASE,

  }
});

router.post('/', (req, res) => {

  const { email, name, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err1, hash1) => {
      db.transaction(trx => {
        trx.insert({
          email: email,
          name: name,
          created: new Date()
        })
          .into('users').withSchema('client')
          .returning('email')
          .then(loginEmail => {
            if (loginEmail[0].email) {
              trx.insert({
                hash: hash1,
                email: loginEmail[0].email
              })
                .into('login').withSchema('client')
                .returning('*')
                .then(user => trx.commit(user))
                .catch(err => res.status(400).json('cannot insert into database'));
            }
          })
          .catch(err => res.status(400).json('user exists'));
      })
        .then(r => res.status(200).json('success'))
        .catch(err => {
          res.status(400).json(`bad request ${ err }`);
        });
    });
  });
});

module.exports = router;