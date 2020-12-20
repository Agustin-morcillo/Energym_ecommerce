const express = require('express');
const router = express.Router();
const usersController= require("../controllers/usersController")
const multer = require('multer');
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');
let {check, validationesult, body} = require ('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/images/users/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

//Login
router.get("/login", guest, usersController.login);
router.post("/login", guest, validator.login, usersController.processLogin);

//Registro
router.get("/register", guest, usersController.register);
router.post("/register", guest, [
    check('name').isLength({min:1}).withMessage('Debe completar el campo: Nombre'),
    check('lastName').isLength({min:1}).withMessage('Debe completar el campo: Apellido'),
    body('email')
    .isLength({min:1})
    .withMessage('Debe completar el campo: Email')
    .bail()
    .isEmail()
    .withMessage('El email ingresado no es válido')
    .bail()
    .custom((value, {req})=> {
        const allUsers = readJson();
        const searchUser = allUsers.find((user) => (value == user.email))

        return !searchUser;
    })
    .withMessage('El usuario ya existe'),
    body('retypeEmail'),
    check('password').isLength({min:5}).withMessage('La contraseña debe tener al menos 5 caracteres'),
    check('retype'),
    check('avatar'),
], upload.any(),usersController.createUser);

//Perfil
router.get('/profile', auth, usersController.profile);

//Editar perfil
router.get("/profile/edit",auth,usersController.editProfile)
router.put("/profile/edit/:id",auth,upload.any(),usersController.editedProfile)

//Logout
router.get('/logout', auth, usersController.logout);



module.exports = router;
