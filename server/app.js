const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectdatabase = require('./config/connectdatabase')

const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const carts = require('./routes/cart')

const admin = require('./routes/admin')






const cors = require('cors');

const app = express();

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Import route files
const products = require('./routes/products');
const orders = require('./routes/order');


connectdatabase()

// Middleware for parsing JSON requests
app.use(express.json());
app.use(bodyParser.json());

app.use(cors())

// Mount routers
app.use('/api/v1/products', products); // Mount 'products' routes
app.use('/api/v1/orders', orders); // Mount 'orders' routes
app.use('/api/v1/cart',carts)
app.use('/api/auth', authRoutes);
app.use('/api/adminauth',admin);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});
