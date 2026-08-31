import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    category: String,
    stock: Number
})


const Product = mongoose.model("dummy-data", ProductSchema, "dummy-data");

export { Product };