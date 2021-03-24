const express = require('express');
const router = express.Router();
const rutinesController = require('../controllers/rutinesController');
const validator = require('../middlewares/validator');
const rutinesMulter = require("../middlewares/multer/rutines")
const adminAuth = require('../middlewares/adminAuth');

/* Página de rutinas */
router.get("/",rutinesController.rutinePage)

/* Detalle rutina */
router.get("/detail/:id", rutinesController.rutineDetail)

/* Crear rutina */
router.get("/create", adminAuth , rutinesController.createRutineView)
router.post("/create", adminAuth , rutinesMulter.any(), validator.createRutine ,rutinesController.storeNewRutine)

/* Editar rutina */
router.get("/edit/:id", adminAuth , rutinesController.editRutineView)
router.put("/edit/:id", adminAuth , rutinesMulter.any(), validator.editRutine ,rutinesController.editRutine)

/* Eliminar rutina */
router.delete("/delete/:id", adminAuth , rutinesController.deleteRutine)

module.exports=router;