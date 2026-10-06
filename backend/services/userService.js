const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userQueries = require("../queries/userQueries");

const createUser = async (userData) => {
    const { name, email, number, password, role } = userData;

    const existingUser = await userQueries.getUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    if (role !== "user" && role !== "vendor") {
        throw new Error("Invalid registration role");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const status = role === "vendor" ? "pending" : "active";

    const newUser = await userQueries.createUser({
        name,
        email,
        number,
        passwordHash,
        role,
        status
    });

    return newUser;
};

const getAllUsers = async () => {
    return await userQueries.getAllUsers();
};

const getUserById = async (id) => {
    const user = await userQueries.getUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const updateUser = async (id, userData) => {
    const existingUser = await userQueries.getUserById(id);

    if (!existingUser) {
        throw new Error("User not found");
    }

    const allowedFields = ["name", "email", "number"];

    const fieldsToUpdate = {};

    for (const field of allowedFields) {
        if (userData[field] !== undefined) {
            fieldsToUpdate[field] = userData[field];
        }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
        throw new Error("No valid fields provided for update");
    }

    // Check email duplicacy
    if (
        fieldsToUpdate.email &&
        fieldsToUpdate.email !== existingUser.email
    ) {
        const existingEmailUser =
            await userQueries.getUserByEmail(fieldsToUpdate.email);

        if (existingEmailUser) {
            throw new Error("Email already exists");
        }
    }

    return await userQueries.updateUser(
        id,
        fieldsToUpdate
    );
};

const deleteUser = async (id) => {
    const existingUser = await userQueries.getUserById(id);

    if (!existingUser) {
        throw new Error("User not found");
    }

    if (existingUser.is_deleted) {
        throw new Error("User is already deleted");
    }

    return await userQueries.softDeleteUser(id);
};

const loginUser = async (email, password) => {
    const user = await userQueries.getUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (user.is_deleted) {
        throw new Error("Account has been deleted");
    }

    if (user.status !== "active") {
        throw new Error("Account is not active");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            number: user.number,
            role: user.role,
            status: user.status
        }
    };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};