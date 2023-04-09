const express = require('express') ; 
const { getAllproducts,
        createProduct,
        ProductDetails,
        updateProducts, 
        deleteProduct} = require('../controllers/productController');

const {isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router= express.Router();

// Get All Product 

router.route('/products').get( getAllproducts)


// create Product 
router.route('/products/new').post(isAuthenticatedUser, authorizeRoles("admin"),createProduct);

// Product DEtails //single product

router.route('/products/:id')
.get(ProductDetails)
.put(isAuthenticatedUser, authorizeRoles("admin"),updateProducts)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)


module.exports = router