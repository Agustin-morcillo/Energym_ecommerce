var express = require('express');
const rutinesController = require('../controllers/rutinesController');
var router = express.Router();

router.get("/admin/create", rutinesController.rutineCreation)
router.get("/admin/edit", rutinesController.rutineEdit)

module.exports=router;