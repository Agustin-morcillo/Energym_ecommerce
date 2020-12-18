const express = require('express');
const router = express.Router();
const usersController= require("../controllers/usersController")
const multer = require('multer');
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/images/users/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get("/login", guest, usersController.login);
router.post("/login", guest, validator.login, usersController.processLogin);
router.get("/register", guest, usersController.register);
router.post("/register", guest, upload.any(),usersController.createUser);
router.get('/logout', auth, usersController.logout);
router.get('/profile', auth, usersController.profile);

module.exports = router;
