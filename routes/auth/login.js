const express = require('express');
const { getUser } = require('../../controllers/user');

const router = express.Router();

router.get('/', ((req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json('please enter email and password');
}));

module.exports = router;