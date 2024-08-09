import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
}, {
    timestamps: true,   // adds createdAt, updatedAt properties 
});

const Product = mongoose.model('Product', productSchema);   // create a collection called Product and use the 'productSchema' schema
// mongoose autoamtically converts 'Product' to 'products', it wants the first letter capital and singular term
export default Product;