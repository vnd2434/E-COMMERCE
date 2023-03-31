const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Your Product Name"]
    },

    description:{
        type:String,
        required:[true, "Please Enter Your Product description"]
    },

    Price:{
        type:Number,
        required:[true, "Please Enter Your Product Price"],
        maxLength:[8 , "Price cannot exceed 8 cherectors"]
    },

    rating:{
        type:Number,
        default:0
    },

    image:[
       {
        public_id :{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       }
    ],

    category:{
        type:String,
        required:[true, "Please Enter Your Product category"]
    },

    Stock:{
        type:String,
        required:[true, "Please Enter Your Product Stock"],
        maxLength:[4 , "Stock cannot exceed 4 charactors"],
        default:1
    },

    numOfReviews:{
        type:Number,
        default:0
    },

    reviews:{
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            Comment:{
                type:String,
                required:true
            },

    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

const productModel = mongoose.model("Product" , productSchema);

module.exports = productModel;
