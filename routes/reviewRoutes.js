const express = require('express');
const router  = express.Router();

const User = require("../models/user");

router.get('/', (req, res, next) => {
    res.render('reviews/index');
});

router.get('/create', (req, res, next) => {
    res.render('reviews/create');
});

router.get('/edit', (req, res, next) => {
    res.render('reviews/edit');
});

router.get('/search', (req, res, next) => {
    const { genre, page } = req.query;
    if(genre){ 
        User
        .find({role: "CURATOR", favoriteGenres: {$elemMatch: {genre}}})
        .sort({ rank: 1 })
        .skip(0*page)
        .limit(10*page)
        .then((data) => {
        res.render('reviews/search', {data, user: req.user});
        })
        .catch(err => console.log(err));
    } else {
        User
        .find({role: "CURATOR"})
        .sort({ rank: 1 })
        .skip(0)
        .limit(10)
        .then((data) => {
        res.render('reviews/search', {data, user: req.user});
        })
        .catch(err => console.log(err));
    }
});

module.exports = router;