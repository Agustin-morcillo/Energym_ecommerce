const express = require('express');
const router = express.Router();
const usersController= require("../controllers/usersController")
const multer = require('multer');

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
router.get("/login", usersController.login);
router.get("/register", usersController.register)
router.post("/register", upload.any(),usersController.createUser);

module.exports = router;
