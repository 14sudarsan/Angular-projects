const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Import your Cart model  const order = await ordermodel.create({cartitems,amount,status})
const products = require('../models/productmodel')
const Users = require('../models/User')
// Add a product to the cart
router.post('/add-to-cart', async (req, res) => {
  try {
    const { email, productId, quantity } = req.body;



    
    

    // Validate request
    if (!email || !productId || !quantity) {
      return res.status(400).json({ message: 'Email, productId, and quantity are required' });
    }
    let checkemail = await Users.findOne({email});
    if(!checkemail){

        return res.status(400).json({ message: 'User not exists' });

    }
    const product = await products.findById(productId);

    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    

    

    

    // Find the user's cart by email
    let cart = await Cart.findOne({ email });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = await Cart.create({
        email,
        items: [{ productId,name:product.name,price:product.price,description:product.description, quantity }],

      });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.items.find((item) => item.productId === productId);

      if (existingItem) {
        // If the product exists, update its quantity
        existingItem.quantity += quantity;

        existingItem.price = existingItem.quantity*existingItem.price

        
        


      // const amount = Number(cartitems.reduce((acc,item) =>(acc + item.product.price*item.qty),0)).toFixed(2)

      } else {
        // If the product doesn't exist, add it to the cart
        cart.items.push({ productId,name:product.name,price:product.price,description:product.description, quantity });
        
      }
    }

    // Save the cart to the database
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('  no cart added Error adding to cart:', error);
    res.status(500).json({ message: '  no cart added Internal server error', error });
  }
});

router.get('/view-cart/:email', async (req, res) => {
  try {
    const { email } = req.params; // Get email from the URL

    // Fetch the user's cart using the email
    const userCart = await Cart.findOne({ email }).populate('items.productId');

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for this email.' });
    }

    const total = Math.round(userCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0));

    console.log(total)

    // Return the populated cart
    res.status(200).json({ cart: userCart.items,total });
  } catch (error) {
    console.error('Error while fetching the cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.delete('/remove-item', async (req, res) => {
  try {
    const { email, productId } = req.body;

    if (!email || !productId) {
      return res.status(400).json({ message: 'Email and productId are required' });
    }

    const cart = await Cart.findOne({ email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
