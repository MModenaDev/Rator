const express = require('express');
const router = express.Router();

const User = require("../models/user");
const Review = require("../models/reviews");

function checkRole() {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.role === "CURATOR") {
            return next();
        } else {
            res.redirect('/')
        }
    }
}

const checkCurator = checkRole();

function check() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/')
        }
    }
}

const checkLogedIn = check();

router.get('/view/:id', checkLogedIn, (req, res, next) => {
    const { id } = req.params;
    Review
        .findById(id)
        .then((data) => {
            res.render('reviews/index', {
                data,
                user: req.user,
                showCurator: (req.user.role == "CURATOR")
            });
        })
        .catch(err => console.log(err))
});


router.get('/create', checkCurator, (req, res, next) => {
    res.render('reviews/create', {
        user: req.user,
        showCurator: (req.user.role == "CURATOR")
    });
});

router.get('/edit/:id', checkCurator, (req, res, next) => {
    const { id } = req.params;
    Review
        .findById(id)
        .then((data) => {
            res.render('reviews/edit', {
                data,
                user: req.user,
                showCurator: (req.user.role == "CURATOR")
            });
        })
        .catch((err) => console.log(err))
});

router.post('/edit/:id', checkCurator, (req, res, next) => {
    const { id } = req.params;
    const { liked, genre, text } = req.body;
    Review
        .findByIdAndUpdate(id, { liked, genre, text})
        .then(() => {
            res.redirect(`/review/view/${id}`)
        })
        .catch((err) => console.log(err))
});

router.get('/search', checkLogedIn, (req, res, next) => {
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
                    showCurator: (req.user.role == "CURATOR"),
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
                    showCurator: (req.user.role == "CURATOR"),
                    user: req.user
                });
            })
            .catch(err => console.log(err));
    }
});

router.post('/create/new', checkCurator, (req, res, next) => {
    const {
        id
    } = req.user;
    const {
        name,
        text,
        liked,
        genre
    } = req.body;
    const newReview = new Review({
        name,
        curator: id,
        text,
        liked,
        genre
    });
    newReview
        .save()
        .then(() => {
            res.redirect("/")
        })
        .catch((err) => {
            err
        })
});

router.post('/delete/:id', checkCurator, (req, res, next) => {
    const { id } = req.params;
    Review
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect("/");
        })
        .catch(err => console.log(err))
});

module.exports = router;