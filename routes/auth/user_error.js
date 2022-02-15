const express = require('express');
const { getCurrentYear } = require('../../util/getCurrentYear')

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('auth/user_error', { title: 'Error', year: getCurrentYear });
  next();
});

module.exports = router;