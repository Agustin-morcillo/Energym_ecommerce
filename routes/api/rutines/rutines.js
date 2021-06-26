const express = require("express")
const router = express.Router()
const apiRutinesController = require("../../../controllers/api/rutines/apiRutinesController")

/* Listado de rutinas */
router.get("/", apiRutinesController.rutineList)

/* Detalle de rutina particular */
router.get("/:id", apiRutinesController.rutineDetail)

module.exports = router
