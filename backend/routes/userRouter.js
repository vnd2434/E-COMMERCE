const express = require('express') ; 
const { regiterUser } = require('../controllers/userController');

const router= express.Router();

router.route("/register").post(regiterUser)


module.exports = router;
