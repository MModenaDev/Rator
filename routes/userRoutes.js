const express = require('express');
const router = express.Router();

const User = require("../models/user");
const Review = require("../models/reviews");

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


router.get('/edit', checkLogedIn, (req, res, next) => {
    const {
        id
    } = req.user;
    User
        .findById(id)
        .then((data) => {
            res.render('users/edit', {
                data,
                showCurator: (data.role == "CURATOR"),
                user: req.user
            });
        })
        .catch(err => console.log(err));
});

router.post('/edit/:id', checkLogedIn, (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
        email,
        role,
        description,
        genre1,
        genre2,
        genre3,
        action
    } = req.body;
    if (action === "edit") {
        User
            .findByIdAndUpdate(id, {
                name,
                email,
                role,
                description,
                favoriteGenres: [genre1, genre2, genre3]
            })
            .then(() => {
                res.redirect(`/user/profile/${id}`);
            })
            .catch(err => console.log(err));
    } else if (action === "delete") {
        User
            .findByIdAndDelete(id)
            .then(() => {
                req.logout();
                res.redirect("/");
            })
            .catch(err => console.log(err));
    }
});

router.post('/profile/:id/updateStar', checkLogedIn, (req, res, next) => {
    console.log(req.body);
    console.log("bateu");

    const {
        id
    } = req.params;
    const {
        count
    } = req.body;
    User
        .findByIdAndUpdate(id, {
            $inc: {
                rate: count
            }
        })
        .then((data) => {
            res.render('users/profile', {
                data,
                showStar: (id != req.user.id),
                showCurator: (req.session.role == "CURATOR"),
                user: req.user
            });
        })
        .catch(err => console.log(err));
});

router.get('/profile/:id', checkLogedIn, (req, res, next) => {
    const { id } = req.params;
    let user = req.user;
    User
    .findById(id)
    .then((userData) => {
        Review
        .find({curator: id})
        .then((reviewsData) => {
                    reviewsData.forEach((elem) => elem.showStar = (id !== user.id));
                    res.render('users/profile', {
                        userData,
                        reviewsData,
                        showStar: (id !== user.id),
                        showCurator: (user.role === "CURATOR"),
                        user: user,
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => console.log(err));
})



module.exports = router;