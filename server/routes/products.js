const express = require('express');
const { getProducts, getSingleProduct, createproducts, getadminproducts, getAdminOrdersForProduct,  } = require('../controllers/productcontroller');

const router=express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getSingleProduct)
router.route('/createproducts').post(createproducts)
router.route('/getproductsadmin/:email').get(getadminproducts)

router.route('/orderedproducts').post(getAdminOrdersForProduct)



module.exports = router;