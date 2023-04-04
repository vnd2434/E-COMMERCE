const ErrorHendler = require("../Utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")

const User = require('../models/userModel')

// REGISTER MODEL 
exports.regiterUser = catchAsyncError(async (req,res,next) =>{
    
    const{name ,email,password}=req.body;

    const userdata= await User.create({

        name, email,password,
        avatar:{
            public_id:'sample ',
            url:'sampleurl'
        }
    });
    
    res.status(200).json({
        succcess:true,
        userdata
    })
})