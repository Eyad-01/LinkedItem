const path = require('path');

const express = require('express');

const router = express.Router();

router.use(express.static(path.join('public')));

router.get('/add-product', (req, res, next) => {
    res.render('add-product');
});

router.post('/add-product', (req, res, next) => {
    res.render('add-product');
});

module.exports = {
    'routes': router,
};