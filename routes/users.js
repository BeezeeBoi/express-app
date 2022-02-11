const express = require('express');
const router = express.Router();
const newUser = require('./auth/signup');
const loginUser = require('./auth/login');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.use('/new', newUser);
router.use('/login', loginUser);

module.exports = router;
