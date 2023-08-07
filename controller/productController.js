const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')


//views all product
const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);    }
}

// find a product
const getProduct = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
//createProduct
const createProduct = asyncHandler(async(req, res) => {  
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // console.log(error.message);
        // res.status(500).json({message: error.message})
    }
})

// update a prodyct
const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // res.status(500).json({message: error.message})
    }
})

// delete a product
const deleteProdct = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
            // return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
        // res.status(500).json({message: error.message})
    }
})
module.exports = {
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProdct
}