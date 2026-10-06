const pool = require("../config/db");


// CREATE PRODUCT
const createProduct = async (productData) => {
    const {
        vendorId,
        name,
        description,
        category,
        price,
        sku,
        stockQuantity,
        imageUrl
    } = productData;

    const query = `
        INSERT INTO products
        (
            vendor_id,
            name,
            description,
            category,
            price,
            sku,
            stock_quantity,
            image_url
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING
            id,
            vendor_id,
            name,
            description,
            category,
            price,
            sku,
            stock_quantity,
            image_url,
            status,
            is_deleted,
            deleted_at,
            created_at,
            updated_at;
    `;

    const values = [
        vendorId,
        name,
        description,
        category,
        price,
        sku,
        stockQuantity,
        imageUrl
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// GET ALL PRODUCTS
const getAllProducts = async () => {
    const query = `
        SELECT
            id,
            vendor_id,
            name,
            description,
            category,
            price,
            sku,
            stock_quantity,
            image_url,
            status,
            is_deleted,
            deleted_at,
            created_at,
            updated_at
        FROM products
        ORDER BY id;
    `;

    const result = await pool.query(query);

    return result.rows;
};


// GET PRODUCT BY ID
const getProductById = async (id) => {
    const query = `
        SELECT
            id,
            vendor_id,
            name,
            description,
            category,
            price,
            sku,
            stock_quantity,
            image_url,
            status,
            is_deleted,
            deleted_at,
            created_at,
            updated_at
        FROM products
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};


// UPDATE PRODUCT
const updateProduct = async (id, productData) => {
    const fields = [];
    const values = [];
    let parameterIndex = 1;

    for (const [field, value] of Object.entries(productData)) {
        fields.push(`${field} = $${parameterIndex}`);
        values.push(value);
        parameterIndex++;
    }

    fields.push(`updated_at = NOW()`);

    values.push(id);

    const query = `
        UPDATE products
        SET
            ${fields.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING
            id,
            vendor_id,
            name,
            description,
            category,
            price,
            sku,
            stock_quantity,
            image_url,
            status,
            is_deleted,
            deleted_at,
            updated_at;
    `;

    const result = await pool.query(query, values);

    return result.rows[0];
};


// SOFT DELETE PRODUCT
const softDeleteProduct = async (id) => {
    const query = `
        UPDATE products
        SET
            is_deleted = TRUE,
            deleted_at = NOW(),
            updated_at = NOW()
        WHERE id = $1
        RETURNING
            id,
            vendor_id,
            name,
            description,
            category,
            price,
            sku,
            stock_quantity,
            image_url,
            status,
            is_deleted,
            deleted_at,
            updated_at;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    softDeleteProduct
};