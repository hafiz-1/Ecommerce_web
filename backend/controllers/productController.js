const productService = require("../services/productService");


// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const vendorId = Number(req.user.id);

        const product = await productService.createProduct(
            vendorId,
            req.body
        );

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        const product = await productService.getProductById(
            productId
        );

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const vendorId = Number(req.user.id);

        const product = await productService.updateProduct(
            productId,
            vendorId,
            req.body
        );

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const vendorId = Number(req.user.id);

        const product = await productService.deleteProduct(
            productId,
            vendorId
        );

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};