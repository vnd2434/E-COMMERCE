
 
// CREATE TOKEN AND SAVING IN COOKIES

const sendToken = (userdata,statusCode,res )=>{

    const token =  userdata.getJWTToken()

    // option for cookie

    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 *60 * 60 *1000
            ),
        httpOnly:true,
    }
    
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        userdata,
        token
    });
}

module.exports = sendToken;
