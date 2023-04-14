const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHendler = require("../Utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/userModel");

// create new Order 

exports.newOrder = catchAsyncError(async(req ,res ,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice  } =  req.body

        const order = await Order.create({ 
                                            shippingInfo,
                                            orderItems,
                                            paymentInfo,
                                            itemPrice,
                                            taxPrice,
                                            shippingPrice,
                                            totalPrice, 
                                            paidAt:Date.now(),
                                            userdata : req.userdata._id
                                        });

        res.status(200).json({
            success:true,
            order
        })
                                              
});

// get Singale Order 

exports.getSingleOrder = catchAsyncError (async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("userdata" , "name email");

    if(!order){
        return next(new ErrorHendler("Order Not Found With This Id ",404))
    }

    res.status(200).json({
        success:true,
        order
    })
});

// Get Logged in User  login user na total ketla order 6 tena mate 

exports.myOrders = catchAsyncError(async (req,res,next)=>{

    const orders = await Order.find({userdata : req.userdata._id});

    res.status(200).json({
        success:true,
        orders,
    });
})

// Get All Order   total jetla order hoi teni Price + thay total amount aave

exports.getAllOrder = catchAsyncError(async (req ,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0 ;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
});


//  Update Order Status   --Admin

exports.updateOrder = catchAsyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHendler("Order Not Found With This Id ",404))
    }

    if(order.oraderStatus === "Delivered"){
        return next(new ErrorHendler("You have already delivered This Order",400))
    }

    order.orderItems.forEach( async (o) => {
        await updateStock(o.product , o.quantity)

    })

    order.oraderStatus = req.body.status;     

    if(req.body.status === "Delivered"){
        order.deliveredAte = Date.now();     
    }

    await order.save({validateBeForeSave : false})

    res.status(200).json({
        success:true
    })
});


// updateStock Function

async function updateStock(id ,quantity){
    const prodata = await Product.findById(id);

    prodata.Stock -= quantity;

    await prodata.save({validateBeForeSave : false})

} 

// delete  Order ---admin

exports.deleteOrder = catchAsyncError(async (req ,res , next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHendler("Order Not Found With This Id ",404))
    }


  await order.deleteOne();

  res.status(200).json({
    success:true
    });
})