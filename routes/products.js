const express = require("express")
const router = express.Router()

const productController = require("../controllers/productController")
const validator = require("../middlewares/validator")
const productsMulter = require("../middlewares/multer/products")
const adminAuth = require("../middlewares/adminAuth")

/* Página de productos */
router.get("/", productController.productPage)

/* Detalle producto */
router.get("/detail/:id", productController.productDetail)

/* Crear producto */
router.get("/create", adminAuth, productController.createProductView)
router.post("/create", adminAuth, productsMulter.any(), validator.createProduct, productController.storeNewProduct)

/* editar producto */
router.get("/edit/:id", adminAuth, productController.editProductView)
router.put("/edit/:id", adminAuth, productsMulter.any(), validator.editProduct, productController.editProduct)

/* Eliminar producto */
router.delete("/delete/:id", adminAuth, productController.deleteProduct)

module.exports = router
