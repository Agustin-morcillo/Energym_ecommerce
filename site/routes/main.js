//***** requires y constantes ***** 
var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');

//***** redireccion a controller ***** 
router.get('/', mainController.homepage);
router.get('/contact', mainController.contactPage);
router.get('/admin', mainController.adminPage);

//***** export ***** 
module.exports = router;
