const express = require('express');
const router = express.Router();
const usersController= require("../controllers/usersController");
const validator = require('../middlewares/validator');
const usersMulter = require("../middlewares/multer/users");
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');
const superAdminAuth = require("../middlewares/superAdminAuth")

/* Login */
router.get("/login", guest, usersController.loginView);
router.post("/login", guest, validator.login, usersController.processLogin);

/* Registro */
router.get("/register", guest, usersController.registerView);
router.post("/register", guest, usersMulter.any(), validator.register, usersController.createUser);

/* Logout */
router.get('/logout', auth, usersController.logout);

/* Perfil */
router.get('/profile', auth, usersController.userProfileView);

/* Editar perfil */
router.get("/profile/edit", auth,usersController.editUserProfileView)
router.put("/profile/edit/:id", auth,usersMulter.any(),validator.profileEdit,usersController.editUserProfile)

/* Vista de administracion de usuarios */
router.get("/admin", superAdminAuth ,usersController.adminUsersView)

/* Convertir en Super Admin  */
router.put("/superAdmin/:id", superAdminAuth ,usersController.becomeSuperAdmin)

/*  Convertir en Admin */
router.put("/admin/:id", superAdminAuth ,usersController.becomeAdmin)

/* Convertir en User  */
router.put("/user/:id", superAdminAuth,usersController.becomeUser)

/* Eliminar usuario */
router.delete("/user/:id",superAdminAuth,usersController.deleteUser)

module.exports = router;
