const productmodel=require('../models/productmodel')

const ordermodel =require('../models/ordermodel')

const adminmodel = require('../models/Admin');


exports.createproducts = async (req, res, next) => {
  try {
    const { email, name, price, description, ratings, images, category, seller, stock, numofReviews } = req.body;

    // Check if the admin exists
    const checkemail = await adminmodel.findOne({ email });

    if (!checkemail) {
      return res.status(500).json({
        success: false,
        message: "Failed to create products - Admin not found",
      });
    }

    const formattedImages = Array.isArray(images)
    ? images.map((img) =>
        typeof img === "string" ? { image: img } : img
      )
    : [];

    // Create the new product
    const newproduct = await productmodel.create({
      email,
      name,
      price,
      description,
      ratings,
      images:formattedImages,
      category,
      seller,
      stock,
      numofReviews,
    });

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product: newproduct, // Return the newly created product details
    });
  } catch (error) {
    console.error("Error creating the product:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

exports.getadminproducts = async (req, res, next) => {
  try {
    const { email } = req.params; // Extract the email from the URL parameter

    // Find all products where the email field matches the provided email
    const adminProducts = await productmodel.find({ email });

    // Check if products exist for the given email
    if (!adminProducts || adminProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for the specified admin email.",
      });
    }

    // Return the products as the response
    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      products: adminProducts,
    });
  } catch (error) {
    console.error("Error while fetching admin products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the products.",
      error: error.message,
    });
  }
};









exports.getProducts =async (req,res,next)=>{

    const query = req.query.keyword
  ? { name: { $regex: req.query.keyword, $options: "i" } }
  : {};

try {
  const products = await productmodel.find(query);

  res.json({
    success: true,
    message: "Get products working",
    products
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: "Failed to get products",
    error: error.message
  });
}


}
exports.getSingleProduct=async(req,res,next)=>{

    try{
        const product = await productmodel.findById(req.params.id)

        console.log(product)


    
   




    res.json({
        success:true,
        message:'get Singleproducts working',

        product
        
        
        

        
    })

    }catch(error){

        res.json({
            success:false,
            message:error.message
        })

    };
    

     
}
//getAdminOrdersForProduct
exports.getAdminOrdersForProduct = async (req, res) => {
  try {
    const { email } = req.body; // Get the admin's email from the request body

    // Step 1: Get all products created by the admin
    const products = await productmodel.find({ email: email });
    console.log("Fetched Products:", products); // Log products to verify

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found for this admin.' });
    }

    // Step 2: Find orders that contain any of the products from the admin
    const productIds = products.map(product => product._id.toString()); // Ensure ObjectId is converted to string
    console.log("Product IDs being queried:", productIds); // Log the product IDs

    const orders = await ordermodel.find({
      'cartitems.productId': { $in: productIds }
    });

    console.log("Fetched Orders:", orders); // Log orders to verify

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for your products.',
        orders
      });
    }

    // Step 3: Process and return the order data
    const orderedProducts = orders.map(order => {
      // Filter cartItems to include only those products created by the admin
      return order.cartitems
        .filter(item => productIds.includes(item.productId.toString()))  // Check product ID match
        .map(item => ({
          email: order.email,    // User's email
          name: item.name,       // Product name from cartItems
          price: item.price,     // Price from cartItems
          status: order.status,   // Order status
          address: order.address,
          quantity:item.quantity,
          phonenumber:order.phonenumber // User's address
        }));
    }).flat(); // Flatten the array of orders and cart items

    // Step 4: Return the ordered products
    res.status(200).json({
      success: true,
      orderedProducts, // List of ordered products
    });
  } catch (error) {
    console.error('Error fetching orders for product:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
