const express = require('express');
const router  = express.Router();

const User = require("../models/user")

/* GET home page */
router.get('/', (req, res, next) => {
  User
    .find({role: "CURATOR"})
    .sort({ rank: 1 })
    .limit(10)
    .then((data) => {
      res.render('index', {data, showCurator: (req.user ? (req.user.role == "CURATOR") : false), user: req.user});
    })
    .catch(err => console.log(err));
});


module.exports = router;