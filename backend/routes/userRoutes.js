const express = require("express");

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:id", authenticate, userController.getUserById);

router.put("/:id", authenticate, userController.updateUser);

router.delete("/:id", authenticate, userController.deleteUser);

router.post("/login", userController.loginUser);

module.exports = router;