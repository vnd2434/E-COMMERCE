const mongoose = require('mongoose');
const validator = require('validator');
var bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:[true ,  'please Entert your name '],
        maxLength:[30 , 'Name cannot Exceed 30 Cherectors'],        
        minLength:[4 , 'Name should Have More Then 4 cherectors'],
    },
    email:{
        type:String,
        requried:[true,'Please Entert Your Email'],
        unique:true,
        validator:[validator.isEmail, 'please Enter Valid Email']
    },
    password:{
        type:String,
        requried:[true, 'Please Entert Your Email'],
        minLength:[8 , 'password should be greterthen 8 cheractors'],
        select:false,
    },
    avatar:{
        public_id :{
            type:String,
            requried:true
        },
        url:{
            type:String,
            requried:true
        }
       },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
});

userSchema.pre("save" ,async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password , 10)
})


const userModel= mongoose.model('User' , userSchema);

module.exports = userModel;