import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {       
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});

    }catch(error) {
        console.error(`No products found!`);
        res.status(404).json({success: false, message: `Error: ${error.message}`});
    }
}

export const createProduct =  async (req, res) => {
    const product = req.body;   // user will send this data
    
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message:" Please provide all necessary information."});
    }
    
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    } catch(error) {
        console.error(`Error in Creating Product: ${error.message}`);
        res.status(500).json({success:false, message: `Server Error`});     // 500 -> internal server error
    }
}

export const updateProduct = async(req, res) => {

    const {id} = req.params;  
    const product = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {      // check if product id doesn't exists
        return res.status(404).json({success: false, message: `Product not found!`});
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    }
    catch(error) {
        res.status(500).json({success: false, message: `Server Error!`});
        
    }
}

export const deleteProduct = async(req, res) => {        // :id -> its dynamic and can have any value
    const {id} = req.params;    // destructuring and getting just id from it, yes it must be written in this exact way
    // console.log(req.params);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: `Product deleted, id: ${id}`});
    
    } catch(error) {
        res.status(404).json({success:false, message: `Product not found.`});
    
    }
    }