const express = require('express');
const { getUser } = require('../../controllers/user');
const { getCurrentYear } = require('../../util/getCurrentYear');
const { userError } = require('user_error');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/login', { title: 'Login', year: getCurrentYear });
});

router.post('/', ((req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json('please enter email and password');
}));

router.use('/error', (req, res) => userError);

module.exports = router;