const express = require('express');
const rutinesController = require('../controllers/rutinesController');
const router = express.Router();
const path = require("path");


/* Crear rutina */
router.get("/create", rutinesController.create)

/* Editar rutina */
router.get("/edit", rutinesController.edit)

/* Detalle de rutina */
router.get("/detail", rutinesController.detail)

/* Eliminar rutina */

module.exports=router;