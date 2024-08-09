import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());    // middleware that allows us to accept json data from req.body

app.get("/", (req, res) => {
        res.send("Server Running!");
});


app.post("/api/products", async (req, res) => {
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
});


app.listen(5000, () => {
    connectDB();
    console.log("Server started at port http://localhost:5000");
});