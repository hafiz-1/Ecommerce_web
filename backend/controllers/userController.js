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
            password
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({
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
    loginUser
};