const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');
const productsMulter = require("../middlewares/multer/products")

/* Detalle producto */
router.get("/detail/:id", productController.detail)

/* Carrito de compras */
router.get("/cart",productController.cart)

/* Pagina de productos */
router.get("/", productController.productPage)

/* Crear producto */
router.get("/create", auth, productController.create)
router.post("/create", auth, productsMulter.any(), validator.createProduct,productController.store)

/* editar producto */
router.get("/edit/:id", auth, productController.edit)
router.put("/edit/:id", auth, productsMulter.any(),validator.editProduct,productController.editProduct)

/* Eliminar producto */
router.delete("/delete/:id" , auth, productController.destroy)

module.exports=router;
