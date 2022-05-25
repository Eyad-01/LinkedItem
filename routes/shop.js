const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.use(express.static(path.join('public')));



router.get('/products', shopController.getProducts);

router.get('/:productId', shopController.getProduct);


module.exports = {
    'routes': router
};