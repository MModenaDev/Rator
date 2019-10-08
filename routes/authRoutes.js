const express = require('express');
const router  = express.Router();
const passport = require('passport');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("../models/user");

router.post("/signin", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/profile",
  failureFlash: true,
  passReqToCallback: true
}));

router.post("/signup", (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password;
  
    if (name === "" || password === "" || email === "") {
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
        name,
        password: hashPass,
        email
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