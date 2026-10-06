const pool = require("../config/db");

const createUser = async (userData) => {
    const {
        name,
        email,
        number,
        passwordHash,
        role,
        status
    } = userData;

    const query = `
        INSERT INTO users
        (name, email, number, password_hash, role, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            id,
            name,
            email,
            number,
            role,
            status,
            is_deleted,
            deleted_at,
            created_at,
            updated_at;
    `;

    const values = [
        name,
        email,
        number,
        passwordHash,
        role,
        status
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

const getAllUsers = async () => {
    const query = `
        SELECT
            id,
            name,
            email,
            number,
            role,
            status,
            is_deleted,
            deleted_at,
            created_at,
            updated_at
        FROM users
        ORDER BY id;
    `;

    const result = await pool.query(query);

    return result.rows;
};

const getUserById = async (id) => {
    const query = `
        SELECT
            id,
            name,
            email,
            number,
            role,
            status,
            is_deleted,
            deleted_at,
            created_at,
            updated_at
        FROM users
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const query = `
        SELECT *
        FROM users
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};

const updateUser = async (id, userData) => {
    const fields = [];
    const values = [];
    let parameterIndex = 1;

    for (const [field, value] of Object.entries(userData)) {
        fields.push(`${field} = $${parameterIndex}`);
        values.push(value);
        parameterIndex++;
    }

    fields.push(`updated_at = NOW()`);

    values.push(id);

    const query = `
        UPDATE users
        SET
            ${fields.join(", ")}
        WHERE id = $${parameterIndex}
        RETURNING
            id,
            name,
            email,
            number,
            role,
            status,
            is_deleted,
            deleted_at;
    `;

    const result = await pool.query(query, values);

    return result.rows[0];
};

const softDeleteUser = async (id) => {
    const query = `
        UPDATE users
        SET
            is_deleted = TRUE,
            deleted_at = NOW(),
            updated_at = NOW()
        WHERE id = $1
        RETURNING
            id,
            name,
            email,
            number,
            role,
            status,
            is_deleted,
            deleted_at,
            created_at,
            updated_at;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};

const updateUserStatus = async (id, status) => {
    const query = `
        UPDATE users
        SET
            status = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING
            id,
            name,
            email,
            number,
            role,
            status,
            is_deleted,
            deleted_at;
    `;

    const result = await pool.query(query, [status, id]);

    return result.rows[0];
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    softDeleteUser,
    updateUserStatus,
    
};