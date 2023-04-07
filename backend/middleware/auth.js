const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const ErrorHendler = require("../Utils/errorHandler");

exports.isAtheticatedUser = catchAsyncError(async ( req , res , next )=>{

        const {token} = req.cookies;

        //  console.log(token);

        if(!token){
                return next(new ErrorHendler("please Login to Access this Resource ",401))
        }
       
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)

        req.userdata = await User.findById(decodedData.id)

        next();
});