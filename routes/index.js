require('dotenv').config();
const express = require('express');
const router = express.Router();
const year = require('../util/getCurrentYear');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Znoobtube', year: year });
});

module.exports = router;
