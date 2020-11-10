const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get("/detail", productController.productDetail)
router.get("/cart", productController.productCart)
router.get("/create", productController.productCreate)
router.get("/edit", productController.productEdit)


module.exports=router;
