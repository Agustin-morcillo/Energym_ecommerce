const express = require('express');
const router = express.Router();
const apiProductsController= require("../../../controllers/api/products/apiProductsController");

/* Listado de productos */
router.get("/",apiProductsController.productList)

/* Detalle de producto particular */
router.get("/:id",apiProductsController.productDetail)

module.exports = router;