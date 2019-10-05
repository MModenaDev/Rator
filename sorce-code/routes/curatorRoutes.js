const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('curators/profile');
});

router.get('/edit', (req, res, next) => {
    res.render('curators/edit');
});

module.exports = router;