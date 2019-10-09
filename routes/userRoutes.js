const express = require('express');
const router  = express.Router();

const User = require("../models/user");

router.get('/profile/:id', (req, res, next) => {
    const { id } = req.params;
    User
        .findById(id)
        .then((data) => {
            res.render('users/profile', {data, showStar:(id!=req.user.id), user: req.user});
        })
        .catch(err => console.log(err));
});

router.get('/edit', (req, res, next) => {
    const { id } = req.user;
    User
        .findById(id)
        .then((data) => {
            res.render('users/edit', {data, showCurator: (data.role == "CURATOR"), user: req.user});
        })
        .catch(err => console.log(err));
});

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, email, role, description, genre1, genre2, genre3 } = req.body;
    User
        .findByIdAndUpdate(id, { name, email, role, description, favoriteGenres:[genre1, genre2, genre3]})
        .then(() => {
            res.redirect('/user');
        })
        .catch(err => console.log(err));
});

router.post('/profile/:id/updateStar', (req, res, next) => {
    console.log(req.body);
    console.log("bateu");
    
    const { id } = req.params;
    const { count } = req.body;
    User
        .findByIdAndUpdate(id, {$inc: {rate: count}})
        .then((data) => {
            res.render('users/profile', {data, showStar:(id!=req.user.id), user: req.user});
        })
        .catch(err => console.log(err));
});

module.exports = router;