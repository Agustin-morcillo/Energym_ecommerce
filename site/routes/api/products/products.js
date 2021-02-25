const express = require('express');
const router = express.Router();
const apiProductsController= require("../../../controllers/api/products/apiProductsController");

router.get("/",apiProductsController.productList)
router.get("/:id",apiProductsController.productDetail)

module.exports = router;