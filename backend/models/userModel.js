const mongoose = require('mongoose');
const validator = require('validator');
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "please Entert your Name "],
        maxLength:[30 , "Name cannot Exceed 30 Cherectors"],        
        minLength:[4 , "Name should Have More Then 4 cherectors"],
    },
    email:{
        type:String,
        required:[true,"Please Entert Your Email"],
        unique:true,
       validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Please Enter Valid Email");
        }
       }
    },
    password:{
        type:String,
        required:[true, 'Please Entert Your Email'],
        minLength:[8 , 'password should be greterthen 8 cheractors'],
        select:false,
    },
    avatar:{
        public_id :{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
});

// Bcrypt PassWord
userSchema.pre("save" ,async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password , 10)
});

// JWT TOKEN

userSchema.methods.getJWTToken =  function() {

    return  jwt.sign({_id:this._id},process.env.JWT_SECRET,{

        expiresIn:process.env.JWT_EXPIRE
    })
}

// Compare Password 

userSchema.methods.comparePassword= async  function(enteredPassword){

  return  bcrypt.compare(enteredPassword , this.password)
}



const userModel= mongoose.model('User' , userSchema);

module.exports = userModel;