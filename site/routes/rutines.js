const express = require('express');
const rutinesController = require('../controllers/rutinesController');
const router = express.Router();
const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../public/images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* Crear rutina */
router.get("/create", rutinesController.create)

/* Editar rutina */
router.get("/edit", rutinesController.edit)

/* Detalle de rutina */
router.get("/detail", rutinesController.detail)

/* Eliminar rutina */

module.exports=router;