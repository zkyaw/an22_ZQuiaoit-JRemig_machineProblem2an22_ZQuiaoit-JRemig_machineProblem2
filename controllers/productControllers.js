// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

const Product = require('../models/product');
const User = require('../models/user');

// Create product (Admin only)
module.exports.productCreation = (reqBody) => {
	return User.findOne({ isAdmin: true }).then((result) => {
		if (!result) {
			return { message: "Admin status is required for this action." };
		} else {
			let newProduct = new Product({
				pName: reqBody.pName,
				pDescription: reqBody.pDescription,
				pPrice: reqBody.pPrice,
			});
			return newProduct.save().then((product, error) => {
				if (error) {
					return false;
				} else {
					return {message : "Product created successfully"};
				}
			});
		}
	});
};

// Retrive all products(Active or not)
module.exports.retrieveProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Error in retrieving the products.' });
    });
};

// Retrieve all active products
module.exports.retrieveActiveProducts = () => {
  return Product.find({ isActive: true })
};

// Retrieve a single product
module.exports.retrieveSingleProduct = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Return the product if found
      res.json(product);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'error' });
    });
};

// Update product information
module.exports.updateProduct = (productId, updatedData) => {
  return Product.findByIdAndUpdate(productId, updatedData, { new: true }).then((updatedProduct) => {
    return updatedProduct;
  });
};

// Archive a product
module.exports.archiveProduct = (productId) => {
  return Product.findByIdAndUpdate(productId, { isActive: false }, { new: true }).then((archivedProduct) => {
    return archivedProduct;
  });
};

// Activate a product
module.exports.activateProduct = (productId) => {
  return Product.findByIdAndUpdate(productId, { isActive: true }, { new: true }).then((activateProduct) => {
    return activateProduct;
  });
};

// User checkout
module.exports.checkout = async (req, res) => {
  try {
    // Retrieve the product details from the request body
    const { productId, quantity } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists and has sufficient quantity for checkout
    if (!product || product.quantity < quantity) {
      return res.status(404).json({ error: 'error' });
    }

    // Perform any additional checkout logic here, such as updating the product quantity, creating an order, etc.

    // Return a success message
    res.json({ message: 'Checkout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error' });
  }
};