const express = require('express');
const router  = express.Router();

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("../models/user");

router.get('/signin', (req, res, next) => {
    res.render('authenticator/signin');
});

router.get('/signup', (req, res, next) => {
    res.render('authenticator/signup');
});

router.post("/signup", (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password;
  
    if (username === "" || password === "" || email === "") {
      res.render("auth/signup", { message: "Indicate username, password and email" });
      return;
    }
  
    User.findOne({ email })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", { message: "Email already in use" });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        password: hashPass,
        name
      });
  
      newUser.save((err) => {
        if (err) {
          res.render("auth/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error)
    })
  });

module.exports = router;