const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            require:true
        },
        city:{
            type:String,
            require:true
        },
        state:{
            type:String,
            require:true
        },
        country:{
            type:String,
            require:true
        },
        pinCode:{
            type:Number,
            require:true 
        },
        phoneNumber:{
            type:Number,
            require:true 
        }
    },
     
    orderItems:[
        {
            name:{
                type:String,
                require:true,
            },
            price:{
                type:Number,
                require:true,
            },
            quantity:{
                type:Number,
                require:true,
            },
            image:{
                type:String,
                require:true,
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                require:true,
            }
        }
    ],

    userdata:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:true
    },

    paymentInfo:{
        id:
        {
            type:String,
            require:true
        },
        status:
        {
            type:String,
            require:true
        }
    },

    paidAt:{
        type:Date,
        require:true
    },

    itemPrice:{
        type:Number,
        default:0,
        require:true,
    },
    
    taxPrice:{
        type:Number,
        default:0,
        require:true,
    },

    shippingPrice:{
        type:Number,
        default:0,
        require:true,
    },

    totalPrice:{
        type:Number,
        default:0,
        require:true,
    },

    oraderStatus:{
        type:String,
        default:"Proccessing",
    },

    deliveredAte:Date,

    createAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Order", orderSchema)