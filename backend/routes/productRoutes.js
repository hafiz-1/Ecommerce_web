const express = require("express");

const productController = require("../controllers/productController");
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// CREATE PRODUCT
router.post("/", authenticate, authorizeRoles("vendor"), productController.createProduct);


// GET ALL PRODUCTS
router.get("/", authenticate, productController.getAllProducts);


// GET PRODUCT BY ID
router.get("/:id", authenticate, productController.getProductById);


// UPDATE PRODUCT
router.patch("/:id", authenticate, authorizeRoles("vendor"), productController.updateProduct);


// DELETE PRODUCT
router.delete("/:id", authenticate, authorizeRoles("vendor"), productController.deleteProduct);


module.exports = router;