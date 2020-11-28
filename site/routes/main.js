//***** requires y constantes ***** 
var express = require('express');
var router = express.Router();
const mainController = require('../controllers/mainController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });

//***** redireccion a controller ***** 
router.get('/', upload.any(), mainController.homepage);
router.get('/contact', mainController.contactPage);
router.get('/admin', mainController.adminPage);

//***** export ***** 
module.exports = router;
