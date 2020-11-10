var express = require('express');
const rutinesController = require('../controllers/rutinesController');
var router = express.Router();

router.get("/create", rutinesController.rutineCreation)
router.get("/edit", rutinesController.rutineEdit)
router.get("/detail", rutinesController.rutineDetail)

module.exports=router;