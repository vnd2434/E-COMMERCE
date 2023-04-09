const ErrorHendler = require("../Utils/errorHandler")

module.exports= (err , req ,res , next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message  || "Internal Server Error";

    // wrong mongodb id error 
    if(err.name === "CastError"){
        const message = `Reshource is not found.Invalid:${err.path}`;
        err = new ErrorHendler(message,400)   
    }

    // // Mongoose Dublicate Error
    if(err.code === 11000){
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHendler(message,400)   
    }

    // Wrong JWT Token 
    if(err.name === "jsonwebTokenError"){
        const message = `Json web Token Is Invalid , Try Again`;
        err = new ErrorHendler(message,400)   
    }

    //JWT EXPRIRE
     if(err.name === "jsonwebTokenError"){
        const message = `Json web Token Is Expire , Try Again`;
        err = new ErrorHendler(message,400)   
    }


    res.status(err.statusCode).json({
        success:false,
        message: err.message,
        
    })
}

