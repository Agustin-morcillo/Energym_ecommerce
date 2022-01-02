const express = require("express")
const router = express.Router()

const cartController = require("../controllers/cartController")
const auth = require("../middlewares/auth")
const orderPageAuth = require("../middlewares/orderPageAuth")

/* Mostrar carrito */
router.get("/", auth, cartController.showCart)

/* Agregar producto al carrito */
router.post("/addToCart/:id/:category", auth, cartController.addToCart)

/* Eliminar producto del carrito */
router.delete("/delete/:id", auth, cartController.deleteFromCart)

/* Efectuar la compra */
router.post("/shop", auth, cartController.shop)

/* Página order de compra */
router.get("/order-page", auth, orderPageAuth, cartController.showOrderPage)

/* Cambiar cantidad de items dentro del carrito */
router.post("/editQuantity", auth, cartController.editQuantity)

module.exports = router
