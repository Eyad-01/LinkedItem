const path = require('path');

const express = require('express');

const router = express.Router();

router.use(express.static(path.join('public')));

router.get('/signIn', (req, res, next) => {
    res.render('SignIn');
});

router.get('/ContactUs', (req, res, next) => {
    res.render('ContactUs');
});

router.get('/CreateAccount', (req, res, next) => {
    res.render('CreateAccount');
});

router.get('/shop', (req, res, next) => {
    res.render('shop');
});

router.get('/product', (req, res, next) => {
    res.render('product');
});

router.get('/', (req, res, next) => {
    res.render('index');
});


module.exports = {
    'routes': router
};