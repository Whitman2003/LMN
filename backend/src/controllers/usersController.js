const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

exports.createUser = async (req, res) => {
    const { username, email, password, confirmPassword, phone } = req.body;

    //All are required except for phone (used for optional contact)
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        //Check if the Username or Email already exists
        try {
            const usernameCheck = await connection.query('SELECT * FROM tblUsers WHERE UserID = ? OR UserEmail = ?', [username, email]);
            if (usernameCheck.length > 0) {
                return res.status(400).json({ message: 'Username or Email already exists' });
            }
        } catch (error) {
            console.error('Error checking existing user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        //Hash the Password and Create the User
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4(); // Generate a unique user ID

        try {
            const result = await connection.query('INSERT INTO tblUsers (UserID, UserName, UserEmail, UserPassword, UserPhone) VALUES (?, ?, ?, ?, ?)', [userId, username, email, hashedPassword, phone]);
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } finally {
        if (connection) connection.release();
    }
};