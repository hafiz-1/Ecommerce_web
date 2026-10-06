const userService = require("../services/userService");

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const requestedUserId = Number(req.params.id);

        if (
            req.user.role !== "admin" &&
            Number(req.user.id) !== requestedUserId
        ) {
            return res.status(403).json({
                message: "You are not allowed to access this user"
            });
        }

        const user = await userService.getUserById(
            requestedUserId
        );

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const requestedUserId = Number(req.params.id);

        if (
            req.user.role !== "admin" &&
            Number(req.user.id) !== requestedUserId
        ) {
            return res.status(403).json({
                message: "You are not allowed to update this user"
            });
        }

        const user = await userService.updateUser(
            requestedUserId,
            req.body
        );

        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const requestedUserId = Number(req.params.id);

        if (
            req.user.role !== "admin" &&
            Number(req.user.id) !== requestedUserId
        ) {
            return res.status(403).json({
                message: "You are not allowed to delete this user"
            });
        }

        const user = await userService.deleteUser(
            requestedUserId
        );

        res.status(200).json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await userService.loginUser(
            email,
            password,
          
        );

        console.log("User logged in successfully", result);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};

const approveVendor = async (req, res) => {
    try {
        const vendorId = Number(req.params.id);

        const vendor = await userService.approveVendor(vendorId);

        res.status(200).json({
            message: "Vendor approved successfully",
            vendor
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const rejectVendor = async (req, res) => {
    try {
        const vendorId = Number(req.params.id);

        const vendor = await userService.rejectVendor(vendorId);

        res.status(200).json({
            message: "Vendor rejected successfully",
            vendor
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const suspendUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        const user = await userService.suspendUser(userId);

        res.status(200).json({
            message: "Account suspended successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const activateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        const user = await userService.activateUser(userId);

        res.status(200).json({
            message: "Account activated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    approveVendor,
    rejectVendor,
    suspendUser,
    activateUser
};