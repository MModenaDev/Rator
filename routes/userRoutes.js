const express = require('express');
const router  = express.Router();

const User = require("../models/user");

router.get('/', (req, res, next) => {
    const { id } = req.user;
    User
        .findById(id)
        .then((data) => {
            res.render('users/profile', {data, user: req.user});
        })
        .catch(err => console.log(err));
});

router.get('/edit', (req, res, next) => {
    const { id } = req.user;
    User
        .findById(id)
        .then((data) => {
            res.render('users/edit', {data, user: req.user});
        })
        .catch(err => console.log(err));
});

module.exports = router;