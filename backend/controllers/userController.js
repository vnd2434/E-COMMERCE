const ErrorHendler = require("../Utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require('../models/userModel')
const sendToken = require('../Utils/jwtToken')
const sendEmail = require('../Utils/sendEmail')
const crypto = require('crypto')



// REGISTER MODEL 
exports.regiterUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const userdata = await User.create({

        name, email, password,
        avatar: {
            public_id: 'sample ',
            url: 'sampleurl'
        }
    })

    sendToken(userdata, 201, res)

})

// Login User 

exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    // checking is user has given password and email both

    if (!email || !password) {
        return next(new ErrorHendler("Please Enter Email and Password", 400))
    }
   

    const userdata = await User.findOne({ email }).select("+password");

    // console.log(userdata)
    if (!userdata) {
        return next(new ErrorHendler("Invalid Email Or Password", 401))
    }

    // email password is match ya not 

    const isPasswordMatched = userdata.comparePassword(password)

    // password match na thay to 
    if (!isPasswordMatched) {
        return next(new ErrorHendler("Invalid Email Or Password", 401))
    }

    sendToken(userdata, 200, res)

});


// LogOut 

exports.logOut = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
});


// Forgot Password

exports.forgatePassword =  catchAsyncError(async (req, res, next) => {


    const userdata = await User.findOne({email:req.body.email});


    if (!userdata) {
        return next(new ErrorHendler("User not Found", 401))
    }

    // Get ResetPassword  Token

    const resetToken = userdata.getResetPasswordToken();

    await userdata.save({ validateBeforeSave: false });


    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`    //aa url ma costomer ne message jay

    //  costomer this message 
    const message = `your Password reset Token is :- \n\n ${resetPasswordUrl} 
                            \n\n if you have not requested this email then, please ingnore it`



    try {

        await sendEmail({
            email: userdata.email,
            subject: `E-commerce Password Recovey`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${userdata.email} successfully`,
        })

    } catch (error) {

        userdata.resetPasswordToken = undefined;

        userdata.resetPasswordExpire = undefined;

        await userdata.save({ validateBeforeSave: false });

        return next(new ErrorHendler(error.message, 500))
    }


});


// RESET PASSWORD 
exports.resetPassword = catchAsyncError(async(req , res , next)=>{
    // creating Token
    const resetPasswordToken = crypto.createHash("sha256").update(req.param.token).digest("hex");

    const userdata = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()
        }
    })
    // cannot find User
    if(!userdata){
        return next(new ErrorHendler("Reset password Token is Invalid or has been Expired",400))
    }

    // find User and passwod nd confrim passwod not same 
    if(req.body.password !== req.body.confrimPassword){
        return next(new ErrorHendler("Password dose not password",400))
    }

    // Password is metch so 
    userdata.password = req.body.password;

    userdata.resetPasswordToken = undefined;
    userdata.resetPasswordExpire = undefined;

    sendToken(userdata , 200 ,res)

});

