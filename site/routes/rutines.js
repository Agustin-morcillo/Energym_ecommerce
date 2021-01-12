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
router.get("/create", rutinesController.createView)
router.post("/create", rutinesMulter.any(), validator.createRutine ,rutinesController.storeRutine)

/* Editar rutina */
router.get("/edit/:id", rutinesController.editView)
router.put("/edit/:id", rutinesMulter.any(), validator.editRutine ,rutinesController.editRutine)

/* Eliminar rutina */
router.delete("/delete/:id", rutinesController.deleteRutine)

module.exports=router;