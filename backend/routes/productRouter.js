const express = require('express') ; 
const { getAllproducts,
        createProduct,
        ProductDetails,
        updateProducts, 
        deleteProduct} = require('../controllers/productController');

const router= express.Router();

// Get All Product 
router.route('/products').get(getAllproducts);

// create Product 
router.route('/products/new').post(createProduct);

// Product DEtails //single product

router.route('/products/:id').get(ProductDetails).put(updateProducts).delete(deleteProduct)








module.exports = router