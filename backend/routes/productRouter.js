const express = require('express') ; 
const { getAllproducts,
        createProduct,
        ProductDetails,
        updateProducts, 
        deleteProduct} = require('../controllers/productController');

const {isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router= express.Router();

// Get All Product 

router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"),  getAllproducts)


// create Product 
router.route('/products/new').post(isAuthenticatedUser , createProduct);

// Product DEtails //single product

router.route('/products/:id')
.get(ProductDetails).
put(isAuthenticatedUser ,updateProducts)
.delete(isAuthenticatedUser, deleteProduct)


module.exports = router