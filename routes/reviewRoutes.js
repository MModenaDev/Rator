const express = require('express');
const router = express.Router();

const User = require("../models/user");
const Review = require("../models/reviews");

router.get('/', (req, res, next) => {
    res.render('reviews/index');
});

router.get('/create', (req, res, next) => {
    res.render('reviews/create', {user: req.user});
});

router.get('/edit', (req, res, next) => {
    res.render('reviews/edit');
});

router.get('/search', (req, res, next) => {
    const {
        genre,
        page
    } = req.query;
    if (genre) {
        User
            .find({
                role: "CURATOR",
                favoriteGenres: genre
            })
            .sort({
                rank: 1
            })
            .skip(0)
            .limit(10)
            .then((data) => {
                res.render('reviews/search', {
                    data,
                    user: req.user
                });
            })
            .catch(err => console.log(err));
    } else {
        User
            .find({
                role: "CURATOR"
            })
            .sort({
                rank: 1
            })
            .skip(0)
            .limit(10)
            .then((data) => {
                res.render('reviews/search', {
                    data,
                    user: req.user
                });
            })
            .catch(err => console.log(err));
    }
});

router.post('/create', (req, res, next) => {
    Review
        .create({})
    res.render('reviews/create', {user: req.user});
});

module.exports = router;