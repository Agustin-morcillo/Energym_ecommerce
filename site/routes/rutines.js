const express = require('express');
const rutinesController = require('../controllers/rutinesController');
const router = express.Router();
const rutinesMulter = require("../middlewares/multer/rutines")
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');


/* Todas las rutinas */
router.get("/",rutinesController.rutinePage)

/* Detalle de rutina */
router.get("/detail/:id", rutinesController.rutineDetail)

/* Crear rutina */
router.get("/create", auth, rutinesController.createView)
router.post("/create", auth, rutinesMulter.any(), validator.createRutine ,rutinesController.storeRutine)

/* Editar rutina */
router.get("/edit/:id", auth, rutinesController.editView)
router.put("/edit/:id", auth, rutinesMulter.any(), validator.editRutine ,rutinesController.editRutine)

/* Eliminar rutina */
router.delete("/delete/:id", auth, rutinesController.deleteRutine)

module.exports=router;