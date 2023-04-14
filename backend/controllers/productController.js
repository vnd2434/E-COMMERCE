const Product = require('../models/productModel')
const ErrorHendler = require("../Utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const ApiFeatures = require("../Utils/apifeatures")


// create Product  -- Admin

exports.createProduct =catchAsyncError(async (req, res, next) => {

    req.body.userdata = req.userdata.id

    const prodata = await Product.create(req.body)

    res.status(200).json({
        success: true,
        prodata
    });
}) 

// GET ALL PRODUCT 
exports.getAllproducts =catchAsyncError( async (req, res, next) => {
  
    const resultPerPage = 5 ;
    const productCount = await Product.countDocuments()   //frontend mathi data leva mate 

  const apiFeature = new  ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);

    const prodata = await apiFeature.query;


    res.status(200).json({
        success: true,
        prodata,
        productCount
    })

})

// Single Product  & Product Details 

exports.ProductDetails =catchAsyncError( async (req, res, next) => {
    const Prodata = await Product.findById(req.params.id);



    if (!Prodata) {
        return next(new ErrorHendler("Product Not Found ", 404));
    }

    res.status(200).json({
        success: true,
        Prodata
    })
})

// UPDATE PRODUCTS 

exports.updateProducts =catchAsyncError( async (req, res, next) => {
    var Prodata = await Product.findById(req.params.id);

    if (!Prodata) {
        return next(new ErrorHendler("Product Not Found ", 404));
    }

    Prodata = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, usefindAndModify: false })

    res.status(200).json({
        success: true,
        message: "product is Upadate",
        Prodata
    })
})

// DELETE PRODUCT

exports.deleteProduct =catchAsyncError(async (req, res, next) => {
    var Prodata = await Product.findById(req.params.id);

    if (!Prodata) {
        return next(new ErrorHendler("Product Not Found ", 404));
    }

    await Product.deleteOne()

    res.status(200).json({
        success: true,
        message: "product is Delete"
    });
})


// Create New Review or Update The REview

exports.createProductReview = catchAsyncError (async(req,res,next)=>{
    const {rating,Comment,productId} = req.body;

    const review = {
        userdata : req.userdata._id,
        name : req.userdata.name,
        rating : Number(rating),
        Comment,
    };

    const prodata = await Product.findById(productId)

    const isReviewed = prodata.reviews.find((rev) => rev.userdata.toString() === req.userdata._id.toString())

   if(isReviewed){
        prodata.reviews.forEach (rev =>{
            if((rev)=> rev.userdata.toString() === req.userdata._id.toString()){
                (rev.rating = rating),(rev.Comment = Comment)            
            }
        })

   }else{
        prodata.reviews.push(review);
   }

//    ratting avrage

   let avg = 0;

   prodata.reviews.forEach(rev =>{
        avg+=rev.rating;
   });

   prodata.ratings = avg/prodata.reviews.length

   await prodata.save({validateBeforeSave:false}),

   res.status(200).json({
    success:true,
   })

});                          

// All Reveiws Of a Singale Product 

exports.getProductReveiws = catchAsyncError(async(req,res,next)=>{

    const prodata = await Product.findById(req.body.id);

    if(!prodata){
        return next(new ErrorHendler("Product Not Found",400))
    }   

    res.status(200).json({
        success:true,
        reviews:prodata.reviews
    })
});

// Delete REviews   ---  baki

exports.deleteReview = catchAsyncError(async(req ,res ,next)=>{
    const prodata =  await Product.findById(req.body.productId)
    
    if(!prodata){
        return next(new ErrorHendler("Product is Not Found",400))
    }
    
    const reviews = prodata.reviews.filter((rev)=> rev._id.toString() !== req.body.id.toString())

    let avg =0 

    reviews.forEach((rev) =>{
        avg+=ratings
    });

    const ratings = avg/reviews.length
    const numOfReviews = reviews.length

    await prodata.findByIdAndUpdate(req.quary.prodata,{
            reviews,
            ratings,
            numOfReviews,
    },{
        new:true,
        runValidators:true,
        usefindAndModify:flase
    });

    res.status(200).json({
        success:true
    })
})

