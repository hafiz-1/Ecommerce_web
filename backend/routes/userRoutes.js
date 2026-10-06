const express = require("express");

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", authenticate, authorizeRoles("admin"), userController.getAllUsers);

router.get("/:id", authenticate, userController.getUserById);

router.patch("/:id", authenticate, userController.updateUser);

router.delete("/:id", authenticate, userController.deleteUser);

router.post("/login", userController.loginUser);

router.patch("/:id/approve",authenticate, authorizeRoles("admin"), userController.approveVendor);

router.patch("/:id/reject", authenticate, authorizeRoles("admin"), userController.rejectVendor);

router.patch("/:id/suspend", authenticate, authorizeRoles("admin"), userController.suspendUser);

router.patch("/:id/activate", authenticate, authorizeRoles("admin"), userController.activateUser);

module.exports = router;