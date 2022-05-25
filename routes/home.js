const path = require('path');

const express = require('express');

const router = express.Router();

router.use(express.static(path.join('public')));

const homeController = require('../controllers/shop');
//add new product


router.get('/signIn', (req, res, next) => {
    res.render('SignIn');
});

router.get('/ContactUs', (req, res, next) => {
    res.render('ContactUs');
});

router.get('/CreateAccount', (req, res, next) => {
    res.render('CreateAccount');
});

router.get('/', homeController.getSomeProducts);


module.exports = {
    'routes': router,
};