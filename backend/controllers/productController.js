const Product = require('../models/productModel')
const ErrorHendler = require("../Utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")


// create Product  -- Admin

exports.createProduct =catchAsyncError(async (req, res, next) => {
    const prodata = await Product.create(req.body)

    res.status(200).json({
        success: true,
        prodata
    });
}) 

// GET ALL PRODUCT 
exports.getAllproducts =catchAsyncError( async (req, res, next) => {

    const prodata = await Product.find()


    res.status(200).json({
        success: true,
        prodata
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


// Limit And Skip

