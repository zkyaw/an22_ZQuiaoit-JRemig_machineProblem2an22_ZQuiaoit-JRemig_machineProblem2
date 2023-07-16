// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const auth = require('../auth');

// Create product (Admin only)
router.post('/createProduct', (req, res) => {
	productControllers.productCreation(req.body)
	.then(resultFromController => res.send(resultFromController))
});

// Retrieve all products(Active or not) 
router.get('/allProducts', productControllers.retrieveProducts);

// Retrieve all active products
router.get('/activeProducts', async (req, res) => {
  try {
    const products = await productControllers.retrieveActiveProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while retrieving active products' });
  }
});

// Retrieve a single product
router.get('/singleProduct/:id', productControllers.retrieveSingleProduct);

// Update product information (Admin only)
router.put('/updateProduct/:id', (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  productControllers.updateProduct(productId, updatedData)
    .then(updatedProduct => {
      res.send(updatedProduct);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

// Archive a product (Admin only)
router.put('/archiveProduct/:id', auth.verify, auth.isAdmin, (req, res) => {
  const productId = req.params.id; // Use req.params.id to get the product ID
  productControllers.archiveProduct(productId).then((resultFromController) => {
    if (resultFromController) {
      res.send(resultFromController);
    } else {
      res.status(500).send('Error archiving product');
    }
  });
});

// Activate a product (Admin only)
router.put("/activateProduct/:id", auth.verify, auth.isAdmin, (req, res) => {
  const productId = req.params.id; // Use req.params.id to get the product ID
  productControllers.activateProduct(productId)
    .then((resultFromController) => {
      if (resultFromController) {
        res.json(resultFromController);
      } else {
        res.status(500).send("Error activating product");
      }
    })
    .catch((error) => {
      res.status(500).send("Error activating product");
    });
});

module.exports = router;