require('dotenv').config();
const express = require('express');
const router = express.Router();

const year = new Date().getFullYear();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Znoobtube', year: year });
});

module.exports = router;
