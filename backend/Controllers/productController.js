const Product = require('../Models/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { productName, description, price, imageUrl } = req.body;
    
    // Get vendor ID from authenticated user session
    const vendorId = req.user._id; // Assuming authentication middleware sets req.user

    const product = await Product.create({
      productName,
      description,
      price,
      imageUrl,
      vendorId
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};