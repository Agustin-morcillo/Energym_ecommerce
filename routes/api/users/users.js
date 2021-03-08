const express = require('express');
const router = express.Router();
const apiUsersController= require("../../../controllers/api/users/apiUsersController")

router.get("/",apiUsersController.listUsers)
router.get("/:id",apiUsersController.userDetail)

router.post("/checkCredentials",apiUsersController.checkLogin)

module.exports = router;