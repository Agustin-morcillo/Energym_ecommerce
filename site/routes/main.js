var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.homepage);
router.get('/contact', mainController.contactPage);

module.exports = router;
