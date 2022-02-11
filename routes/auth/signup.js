const express = require('express');
const { createNewUser, validateUser } = require('../../controllers/user');
const db = require('../../controllers/knexConfig');

const router = express.Router();

router.post('/',(req, res) => {
  const { email, name, password } = req.body;

  db.select('*')
    .from('users')
    .where('email', '=', email)
    .withSchema('client')
    .then(user => {
      const result = user.length;
      if (result === 1) {
        return res.status(400).json('Invalid Credentials');
      } else {
        createNewUser(email, name, password)
          .then(() => res.status(200).json('user created'))
          .catch(() => res.status(400).json('error occurred'));
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;