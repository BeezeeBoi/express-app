require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getCurrentYear } = require('../util/getCurrentYear');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Znoobtube', year: getCurrentYear });
});

module.exports = router;
