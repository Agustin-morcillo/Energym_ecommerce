var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.homepage);
router.get('/contact', mainController.contactPage);
router.get('/admin', mainController.adminPage);

module.exports = router;
