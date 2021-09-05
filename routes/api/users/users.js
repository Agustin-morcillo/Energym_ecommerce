const express = require("express")
const router = express.Router()

const apiUsersController = require("../../../controllers/api/users/apiUsersController")

/* Listado de usuarios */
router.get("/", apiUsersController.listUsers)

/* Detalle de usuario particular */
router.get("/:id", apiUsersController.userDetail)

/* API para chequar login desde el Front-end */
router.post("/checkCredentials", apiUsersController.checkLogin)

module.exports = router
