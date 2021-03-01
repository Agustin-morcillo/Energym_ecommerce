const express = require('express');
const router = express.Router();
const usersController= require("../controllers/usersController")
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest');
const usersMulter = require("../middlewares/multer/users")
const superAdminAuth = require("../middlewares/superAdminAuth")


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
router.put("/profile/edit/:id",auth,usersMulter.any(),validator.profileEdit,usersController.editedProfile)

//Logout
router.get('/logout', auth, usersController.logout);

/* Vista de administracion de usuarios */
router.get("/admin", superAdminAuth ,usersController.adminUsers)

/* Convertir en Super Admin  */
router.put("/superAdmin/:id", superAdminAuth ,usersController.becomeSuperAdmin)

/*  Convertir en Admin */
router.put("/admin/:id", superAdminAuth ,usersController.becomeAdmin)

/* Convertir en User  */
router.put("/user/:id", superAdminAuth,usersController.becomeUser)

/* Eliminar usuario */
router.delete("/user/:id",superAdminAuth,usersController.deleteUser)






module.exports = router;
