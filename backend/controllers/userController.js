const ErrorHendler = require("../Utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require('../models/userModel')
const sendToken = require('../Utils/jwtToken')


// REGISTER MODEL 
exports.regiterUser = catchAsyncError(async (req,res,next) =>{

    const{name ,email,password}=req.body;

    const userdata= await User.create({
        
        name, email,password,
        avatar:{
            public_id:'sample ',
            url:'sampleurl'
        }
    })
    
    sendToken(userdata,201,res)

})

// Login User 

exports.loginUser= catchAsyncError (async (req , res , next)=>{

    const {email , password} = req.body

    // checking is user has given password and email both

    if(!email || !password)
    {
        return next(new ErrorHendler("Please Enter Email and Password",400))
    }

    const userdata= await User.findOne({email}).select("+password");


    if(!userdata){
        return next(new ErrorHendler("Invalid Email Or Password",401))
    }

    // email password is match ya not 

    const isPasswordMatched  = userdata.comparePassword(password)

// password match na thay to 
    if(!isPasswordMatched){
        return next(new ErrorHendler("Invalid Email Or Password",401))
    }

    sendToken(userdata,200,res)    

});


// LogOut 

exports.logOut = catchAsyncError(async (req , res ,next )=>{

    res.cookie("token"  , null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})