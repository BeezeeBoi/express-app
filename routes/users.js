const express = require('express');
const router = express.Router();
const newUser = require('./auth/signup');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.use('/new', newUser);

module.exports = router;
