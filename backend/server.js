import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';


dotenv.config();

const app = express();
app.use(express.json());    // middleware that allows us to accept json data from req.body

app.use("/api/products", productRoutes);


app.listen(5000, () => {
    connectDB();
    console.log("Server started at port http://localhost:5000");
});