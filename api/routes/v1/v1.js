
const express = require("express");
const authController = require('../../controllers/v1/authController')
const router = express();
router.post('/login',authController.login);
router.all("*", function (req, res, next) {
    res.send("Invalid Url");
});


module.exports = router;