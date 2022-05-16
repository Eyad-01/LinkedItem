const path = require('path');

const express = require('express');

const router = express.Router();

router.use(express.static(path.join('public')));

module.exports = {
    'routes': router,
};