var express = require('express');
var Users = require('../models/usuario');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const user= await Users.find(); 
  res.json(user)
});

module.exports = router;
