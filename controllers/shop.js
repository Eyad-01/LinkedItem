const mongodb = require('mongodb');
const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/allProducts', {
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSomeProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('index', {
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    return Product.findById(prodId)
        .then(product => {
            res.render('shop/product-details', {
                product: product,
            });
        })
        .catch(err => console.log(err));
};