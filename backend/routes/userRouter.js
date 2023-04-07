const express = require('express') ; 
const { regiterUser, loginUser, logOut } = require('../controllers/userController');

const router= express.Router();

router.route("/register").post(regiterUser);

// loginrouter

router.route("/login").post(loginUser)

// logOut 

router.route("/logout").get(logOut)




module.exports = router;
