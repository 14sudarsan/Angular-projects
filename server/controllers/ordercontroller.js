const ordermodel = require("../models/ordermodel")

const productmodel = require("../models/productmodel")

const mongoose = require("mongoose")

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use Gmail as email service or any other provider
  auth: {
    user: 'projectbot646@gmail.com',  // Your email address
    pass: 'qfub aclp uray upwl',  // Your email password or use an app password
  },
});

const PAYTABS_URL = " https://secure-global.paytabs.com/payment/request";
const PROFILE_ID = process.env.PAYTABS_PROFILE_ID;
const SERVER_KEY = process.env.PAYTABS_SERVER_KEY;
const RETURN_URL = "http://localhost:8000/api/v1/orders/paysuccess"; // Adjust as needed

// Create Payment Request
exports.payorder =  async (req, res) => {
    try {
        const { amount, currency, customer_name, customer_email } = req.body;

        const response = await axios.post(PAYTABS_URL, {
            profile_id: PROFILE_ID,
            tran_type: "sale",
            tran_class: "ecom",
            cart_id: `cart_${Date.now()}`,
            cart_description: "E-commerce Transaction",
            cart_currency: currency,
            cart_amount: amount,
            customer_details: {
                name: customer_name,
                email: customer_email,
                phone: "0000000000",
                street1: "Street Address",
                city: "City",
                state: "State",
                country: "AE",
                zip: "00000",
            },
            callback: `${RETURN_URL}/callback`,
            return: RETURN_URL,
        }, {
            headers: { Authorization: `Bearer ${SERVER_KEY}` }
        });
        console.log(response)
        res.json(response.data);
    } catch (error) {
        
        res.status(500).json({ error: "Payment initialization failed" });
    }
};




exports.createOrder = async (req, res, next) => {
  try {
    const { email, cartItems ,address,phonenumber} = req.body; // Extract email and cartItems from the request

    
    // Calculate the total amount for the new cartItems
    let amount = 0;
    for (const item of cartItems) {
      amount += item.price * item.quantity;
    }
    amount = amount.toFixed(2);

    const status = "pending"; // Default status for a new order

    // Create a new order in the database for the user
    const newOrder = await ordermodel.create({
      email,
      cartitems: cartItems,
      amount,
      status,
      address,
      phonenumber:phonenumber
    });

    const userEmail = req.body.email;
    const subject = 'Order Confirmation';
    const text = `
      Dear Customer,

      Thank you for your order! Here are the details:

      Total Amount: $${amount}
      Order Status: ${status}
      Ordered Address : ${address}

      We will notify you when your order is processed.

      Best Regards,
      Your Store Name
    `;

    const mailOptions = {
      from: 'projectbot646@gmail.com',  // Sender's email address
      to: userEmail,  // Recipient's email address (user)
      subject: subject,  // Subject of the email
      text: text,  // Email body text
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Order placed but failed to send email' });
      }
      console.log('Email sent: ' + info.response);
    });

    // Update stock for each product in the cart
    for (const item of cartItems) {
      const product = await productmodel.findById(item.productId);

      if (product) {
        product.stock -= item.quantity; // Deduct stock for each product
        await product.save(); // Save the updated product
      } else {
        console.error(`Product with ID ${item.productId} not found`);
        throw new Error(`Product with ID ${item.productId} not found`);
      }
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: newOrder, // Return the newly created order details
    });
  } catch (error) {
    console.error("Error creating the order:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order.",
      error: error.message,
    });
  }
};


exports.getuserorders = async (req, res, next) => {
  try {
    const { email } = req.params; // Get the email from the URL parameter

    // Fetch all orders for the provided email
    const userOrders = await ordermodel.find({ email });

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this email.' });
    }

    // Structure the response to return all details
    res.status(200).json({
      success: true,
      orders: userOrders.map(order => ({
        cartitems: order.cartitems,
        amount: order.amount,
        status: order.status,
        email: order.email,
        address:order.address,
        phonenumber:order.phonenumber
      })),
    });
  } catch (error) {
    console.error('Error while fetching the orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const Payment = require("../models/payment");

exports.paymentsucces =  async (req, res) => {
    const { transaction_id, amount, currency, customer_name, customer_email, status } = req.body;

    try {
        const newPayment = new Payment({ transaction_id, amount, currency, customer_name, customer_email, status });
        await newPayment.save();
        res.status(200).json({ message: "Payment stored successfully" });
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
};




