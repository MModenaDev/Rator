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

router.post('/create/new', (req, res, next) => {
    const { id } = req.session;
    const { name, text, genre }= req.body;
    console.log({ name, curator: id, text, genre });
    const newReview = new Review({ name, curator: id, text, genre });
    newReview
        .save()
        .then(() => { res.redirect("/")})
        .catch((err) => {err})
});

module.exports = router;