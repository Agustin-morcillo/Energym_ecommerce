const express = require("express")
const router = express.Router()
const mainController = require("../controllers/mainController")
const validator = require("../middlewares/validator")
const adminAuth = require("../middlewares/adminAuth")

/* Homepage */
router.get("/", mainController.homepage)

/* Página de contacto */
router.get("/contact", mainController.contactPage)
router.post("/contact", validator.contact, mainController.storageContactInfo)

/* Página de Admin */
router.get("/admin", adminAuth, mainController.adminPage)

module.exports = router
