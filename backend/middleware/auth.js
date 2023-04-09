const ErrorHendler = require("../Utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');




exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

        const { token } = req.cookies;

        // console.log(token);

        if (!token) {
                return next(new ErrorHendler("please Login to Access this Resource ", 401))
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET)

        // console.log(decodeData);

        req.userdata = await User.findById(decodeData.id)

        // console.log(req.userdata);

        next();
});


exports.authorizeRoles = (...roles) => {
        return (req, res, next) => {
                // console.log(req.userdata);
                if (!roles.includes(req.userdata.role)) {
                        return next(new ErrorHendler(`Role : ${req.userdata.role} is not allow to access this resource`, 403))
                }

                next();
        }
}
