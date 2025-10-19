const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

exports.createUser = async (req, res) => {
    const { username, email, password, confirmPassword, phone, fname, lname, addressLine1, addressLine2, city, state, zip } = req.body;

    //All are required except for phone (used for optional contact)
    if (!username || !email || !password || !confirmPassword || !fname || !lname || !addressLine1 || !city || !state || !zip) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
    }

    if (phone.length != 10) {
        return res.status(400).json({ message: 'Phone number must be 10 digits' });
    }

    if (zip.length != 5) {
        return res.status(400).json({ message: 'ZIP code must be 5 digits' });
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

        //Insert the new user into the database
        try {
            const result = await connection.query('INSERT INTO tblUsers (UserID, UserName, UserEmail, UserPassword, UserPhone, UserFirstName, UserLastName) VALUES (?, ?, ?, ?, ?)', [userId, username, email, hashedPassword, phone, fname, lname]);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

        //Insert the address into the database
        try {
            const addressID = uuidv4();
            const addressResult = await connection.query('INSERT INTO tblAddresses (AddressID, UserID, StreetAddressLine1, StreetAddressLine2, City, State, ZipCode) VALUES (?, ?, ?, ?, ?, ?, ?)', [addressID, userId, addressLine1, addressLine2, city, state, zip]);
            res.status(201).json({ message: 'User created successfully', userId: userId });
        } catch (error) {
            console.error('Error creating address:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } finally {
        if (connection) connection.release();
    }
};

exports.signIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // Check if the user exists
        try {
            const user = await connection.query('SELECT * FROM tblUsers WHERE UserName = ?', [username]);
            if (!user || user.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Check if the password is correct
            const isPasswordValid = await bcrypt.compare(password, user[0].UserPassword);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            //Create a new session
            const sessionID = uuidv4();
            try {
                await connection.query('INSERT INTO tblSessions (SessionID, UserID, CreatedAt, ExpiresAt) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR))', [sessionID, user[0].UserID]);
                res.status(200).json({ message: 'Sign in successful', userId: user[0].UserID });
            } catch (error) {
                console.error('Error creating session:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        } catch (error) {
            console.error('Error checking user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
}