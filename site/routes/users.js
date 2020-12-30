const express = require('express');
const router = express.Router();
const usersController= require("../controllers/usersController")
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');
const usersMulter = require("../middlewares/multer/users")


//Login
router.get("/login", guest, usersController.login);
router.post("/login", guest, validator.login, usersController.processLogin);

//Registro
router.get("/register", guest, usersController.register);
router.post("/register", guest, usersMulter.any(), validator.register, usersController.createUser);


//Perfil
router.get('/profile', auth, usersController.profile);

//Editar perfil
router.get("/profile/edit",auth,usersController.editProfile)
router.put("/profile/edit/:id",auth,usersMulter.any(),usersController.editedProfile)

//Logout
router.get('/logout', auth, usersController.logout);


module.exports = router;
