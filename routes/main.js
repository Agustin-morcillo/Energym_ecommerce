//***** requires y constantes ***** 
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const validator = require('../middlewares/validator');


//Homepage
router.get('/', mainController.homepage);

//ContactPage
router.get('/contact', mainController.contactPage);
router.post('/contact', validator.contact , mainController.storageContactInfo);

//AdminPage
router.get('/admin', auth, adminAuth, mainController.adminPage);

//***** export ***** 
module.exports = router;
