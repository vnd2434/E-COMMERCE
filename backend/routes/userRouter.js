const express = require('express') ; 
const { regiterUser, loginUser, logOut, forgatePassword, resetPassword } = require('../controllers/userController');

const router= express.Router();

router.route("/register").post(regiterUser);

// loginrouter

router.route("/login").post(loginUser)

// forgot password
router.route("/password/forget").post(forgatePassword)

// reset password
router.route("/password/reset/:token").put(resetPassword)

// logOut 

router.route("/logout").get(logOut)




module.exports = router;
