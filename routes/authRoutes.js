const express = require('express');
const router  = express.Router();
const passport = require('passport');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("../models/user");

router.post("/login", passport.authenticate('local-login', {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true
}));

router.post("/signup", (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password;
    const role = req.body.role;
  
    if (name === "" || password === "" || email === "") {
      res.render("error", { message: "Indicate username, password and email" });
      return;
    }

    User.findOne({ email })
    .then(user => {
      if (user !== null) {
        res.render("error", { message: "Email already in use" });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        name,
        password: hashPass,
        email,
        role
      });
  
      newUser.save((err) => {
        if (err) {
          res.render("error", { message: "Something went wrong" });
        } else {
          if(role==="CURATOR") res.render("users/edit", {user: req.user});
          else res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error)
    })
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
module.exports = router;