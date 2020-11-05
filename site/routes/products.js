const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get("/detail", productController.productDetail)
router.get("/cart", productController.productCart)
router.get("/admin", productController.productAdmin)
router.get("/admin/create", productController.productCreation)
router.get("/admin/edit", productController.productEdit)


module.exports=router;
