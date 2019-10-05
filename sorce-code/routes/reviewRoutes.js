const express = require('express');
const router  = express.Router();

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
    res.render('reviews/search');
});

module.exports = router;