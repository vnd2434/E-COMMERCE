const express = require('express');
const { regiterUser, 
        loginUser,
        logOut, 
        forgatePassword,
        resetPassword,
        getUserDetails, 
        updatePassword,
        updateProfile,
        getAllUser,
        getSingleUser,
        updateUserRole,
        deleteUser} = require('../controllers/userController');

const {isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/register").post(regiterUser);

router.route("/login").post(loginUser)

router.route("/password/forget").post(forgatePassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logOut);

router.route("/me").get(isAuthenticatedUser ,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser ,updatePassword)

router.route("/update/profile").put(isAuthenticatedUser , updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin") ,getAllUser);

router.route("/admin/users/:id").get(isAuthenticatedUser, authorizeRoles("admin") ,getSingleUser);

router.route("/admin/users/:id").put(isAuthenticatedUser, authorizeRoles("admin") ,updateUserRole)
                                .delete(isAuthenticatedUser, authorizeRoles("admin") ,deleteUser);



module.exports = router;
