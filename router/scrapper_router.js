const express = require('express');
const router = express.Router();
const { getMeals } = require('../controller/web_scraper');


router.route('/meals').get(getMeals);


module.exports = router;

