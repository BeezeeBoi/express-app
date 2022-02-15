const express = require('express');
const { createNewUser } = require('../../controllers/user');
const db = require('../../controllers/knexConfig');
const { getCurrentYear } = require('../../util/getCurrentYear');
const userError = require('./user_error');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/signup', { title: 'Signup', year: getCurrentYear });
})

router.post('/', (req, res) => {
  const { email, name, password } = req.body;

  if (!email) {
    return res.status(400).json('Enter a valid email');
  }
  else if (!name) {
    return res.status(400).json('Enter a valid name');
  }
  else if (!password) {
    return res.status(400).json('Enter a valid password');
  }

  db.select('*')
    .from('users')
    .where('email', '=', email)
    .withSchema('client')
    .then(user => {
      const result = user.length;
      if (result === 1) {
        return res.status(400).json('Invalid Credentials');
      }
      else {
        createNewUser(email, name, password)
          .then(() => res.status(200).json('user created'))
          .catch(() => res.status(400).json('error occurred'));
      }
    })
    .catch(err => console.log(err));
});

router.use('/error', userError);

module.exports = router;