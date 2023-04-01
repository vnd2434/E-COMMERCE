const ErrorHendler = require("../Utils/errorHandler")

module.exports= (err , req ,res , next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message  || "Internal Server Error";

    // wrong mongodb id error 
    if(err.name === "CastError"){
        const message = `Reshource is not found.Invalid:${err.path}`;
     Error = new ErrorHendler(message,400)   
    }

    res.status(err.statusCode).json({
        success:false,
        message: Error.message,
        
    })
}

