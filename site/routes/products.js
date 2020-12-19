const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const path = require("path");
const multer = require('multer');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* Detalle producto */
router.get("/detail/:id", productController.detail)

/* Carrito de compras */
router.get("/cart", auth,productController.cart)

/* Pagina de productos */
router.get("/", productController.productPage)

/* Crear producto */
router.get("/create", auth,productController.create)
router.post("/create", auth,upload.any(), productController.store)

/* editar producto */
router.get("/edit/:id", auth,productController.edit)
router.put("/edit/:id", auth,upload.any() ,productController.editProduct)

/* Eliminar producto */
router.delete("/delete/:id",auth ,productController.destroy)

module.exports=router;
