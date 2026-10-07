const productQueries = require("../queries/productQueries");
const userQueries = require("../queries/userQueries");


// CREATE PRODUCT
const createProduct = async (vendorId, productData) => {
    const vendor = await userQueries.getUserById(vendorId);

    if (!vendor) {
        throw new Error("Vendor not found");
    }

    if (vendor.role !== "vendor") {
        throw new Error("Only vendors can create products");
    }

    if (vendor.status !== "active") {
        throw new Error("Vendor account is not active");
    }

    if (vendor.is_deleted) {
        throw new Error("Vendor account has been deleted");
    }

    const {
        name,
        description,
        category,
        price,
        sku,
        stock_quantity,
        image_url
    } = productData;

    return await productQueries.createProduct({
        vendorId,
        name,
        description,
        category,
        price,
        sku,
        stockQuantity: stock_quantity,
        imageUrl: image_url
    });
};


// GET ALL PRODUCTS
const getAllProducts = async () => {
    return await productQueries.getAllProducts();
};


// GET PRODUCT BY ID
const getProductById = async (id) => {
    const product = await productQueries.getProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


// UPDATE PRODUCT
const updateProduct = async (id, vendorId, productData) => {
    const product = await productQueries.getProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    console.log("Logged in vendor:", vendorId);
    console.log("Product owner:", product.vendor_id);

    if (Number(product.vendor_id) !== Number(vendorId)) {
        throw new Error("You are not allowed to update this product");
    }

    if (product.is_deleted) {
        throw new Error("Product is already deleted");
    }

    const allowedFields = [
        "name",
        "description",
        "category",
        "price",
        "sku",
        "stock_quantity",
        "image_url",
        "status"
    ];

    const fieldsToUpdate = {};

    for (const field of allowedFields) {
        if (productData[field] !== undefined) {
            fieldsToUpdate[field] = productData[field];
        }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
        throw new Error("No valid fields provided for update");
    }

    return await productQueries.updateProduct(
        id,
        fieldsToUpdate
    );
};


// DELETE PRODUCT
const deleteProduct = async (id, vendorId) => {
    const product = await productQueries.getProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    if (Number(product.vendor_id) !== Number(vendorId))  {
        throw new Error("You are not allowed to delete this product");
    }

    if (product.is_deleted) {
        throw new Error("Product is already deleted");
    }

    return await productQueries.softDeleteProduct(id);
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};