const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  setTimeout(() => res.redirect(302, 'http://localhost:3000/users'), 5000);
});

module.exports = router;