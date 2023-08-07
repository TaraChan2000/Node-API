const express = require('express');
const router = express.Router();
const Product = require('../models/productModel')
const {getProduct, getProducts, createProduct, updateProduct, deleteProdct} = require('../controller/productController')


router.get('/', getProducts);

router.get('/:id', getProduct);


router.post('/', createProduct);

// update a product
router.put('/:id', updateProduct);

// delete a product

router.delete('/:id', deleteProdct);

module.exports = router; 