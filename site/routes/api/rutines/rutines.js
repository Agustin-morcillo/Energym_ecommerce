const express = require('express');
const router = express.Router();
const apiRutinesController= require("../../../controllers/api/rutines/apiRutinesController");

router.get("/",apiRutinesController.rutineList)
router.get("/:id",apiRutinesController.rutineDetail)

module.exports = router;

