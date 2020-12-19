//***** requires y constantes ***** 
var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');
const auth = require('../middlewares/auth');


//Homepage
router.get('/', mainController.homepage);

//ContactPage
router.get('/contact', mainController.contactPage);
router.post('/contact', mainController.storageContactInfo);

//AdminPage
router.get('/admin', auth,mainController.adminPage);

//***** export ***** 
module.exports = router;
