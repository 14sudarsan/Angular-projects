const express = require('express');

const { createOrder,payorder ,getuserorders,confirmOrder,paymentsucces} = require('../controllers/ordercontroller');
const router = express.Router();




router.route('/getuserorders/:email').get(getuserorders)

router.route('/').post(createOrder)
router.route('/pay').post(payorder);
router.route('/paysuccess').post(paymentsucces)

module.exports = router;