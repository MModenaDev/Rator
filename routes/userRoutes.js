const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
    res.render('users/profile');
});

router.get('/edit', (req, res, next) => {
    res.render('users/edit');
});

module.exports = router;