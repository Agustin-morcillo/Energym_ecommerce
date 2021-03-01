const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');
const productsMulter = require("../middlewares/multer/products")
const adminAuth = require('../middlewares/adminAuth');

/* Detalle producto */
router.get("/detail/:id", productController.detail)

/* Pagina de productos */
router.get("/", productController.productPage)

/* Crear producto */
router.get("/create", auth, adminAuth,productController.create)
router.post("/create", auth, adminAuth,productsMulter.any(), validator.createProduct,productController.store)

/* editar producto */
router.get("/edit/:id", auth,adminAuth ,productController.edit)
router.put("/edit/:id", auth,adminAuth ,productsMulter.any(),validator.editProduct,productController.editProduct)

/* Eliminar producto */
router.delete("/delete/:id" , auth, adminAuth,productController.destroy)

module.exports=router;
