const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const authenticate = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "E-Commerce API is running"
    });
});


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

module.exports = app;