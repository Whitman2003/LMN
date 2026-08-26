import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pool from '../db/pool.js';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const createUser = async (req, res) => {
    const { username, email, password, confirmPassword, phone, fName, lName, addressLine1, addressLine2, city, state, zip } = req.body;
    //All are required except for phone (used for optional contact)
    if (!username || !email || !password || !confirmPassword || !fName || !lName || !addressLine1 || !city || !state || !zip) {
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
        await connection.beginTransaction();

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
            const result = await connection.query('INSERT INTO tblUsers (UserID, UserName, UserEmail, UserPassword, UserPhone, UserFirstName, UserLastName) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, username, email, hashedPassword, phone, fName, lName]);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

        //Insert the address into the database
        try {
            const addressID = uuidv4();
            const addressResult = await connection.query('INSERT INTO tblAddress (AddressID, UserID, StreetAddressLine1, StreetAddressLine2, City, State, ZipCode) VALUES (?, ?, ?, ?, ?, ?, ?)', [addressID, userId, addressLine1, addressLine2, city, state, zip]);
        } catch (error) {
            console.error('Error creating address:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

        //Email Verification Process
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit token
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        try {
            await connection.query('INSERT INTO tblEmailVerification (VerificationID, UserID, Token, ExpiresAt) VALUES (?, ?, ?, ?)', [uuidv4(), userId, verificationToken, expiresAt]);
            
            const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
                }
            });
        
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Email Verification',
                html: `<p>Please verify your email by using the number below:</p><h2>${verificationToken}</h2>`
            });

            await connection.commit();
            res.status(201).json({ message: 'User created successfully, needs to verify.', userId: userId, verificationToken: verificationToken });
        } catch (error) {
            console.error('Error creating email verification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
};

export const signIn = async (req, res) => {
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
            } catch (error) {
                console.error('Error creating session:', error);
                return res.status(500).json({ message: 'Error creating session.' });
            }

            //Add the session into the user table
            try {
                await connection.query('UPDATE tblUsers SET SessionID = ? WHERE UserID = ?', [sessionID, user[0].UserID]);
                res.status(200).json({ message: 'Sign in successful', userId: user[0].UserID });
            } catch (error) {
                console.error('Error updating user session:', error);
                return res.status(500).json({ message: 'Error setting sessionID in User.' });
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

export const verifyEmail = async (req, res) => {
    var token = req.body.body;

    if (!token) {
        return res.status(400).json({ message: 'Verification token is required' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        try {
            const result = await connection.query('SELECT * FROM tblEmailVerification WHERE Token = ?', [token]);
            if (!result || result.length === 0) {
                return res.status(400).json({ message: 'Invalid verification token' });
            }

            const verification = result[0];

            if (new Date(verification.ExpiresAt) < new Date()) {
                return res.status(400).json({ message: 'Verification token has expired' });
            }

            try {
                await connection.query('UPDATE tblUsers SET isVerified = TRUE WHERE UserID = ?', [verification.UserID]);
            } catch (error) {
                console.error('Error updating user verification status:', error);
                return res.status(500).json({ message: 'Error updating user verification status.' });
            }

            try {
                await connection.query('DELETE FROM tblEmailVerification WHERE VerificationID = ?', [verification.VerificationID]);
            } catch (error) {
                console.error('Error deleting verification record:', error);
                return res.status(500).json({ message: 'Error deleting verification record.' });
            }

            res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
};

export const resendVerification = async (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // Generate a new verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

        // Get the userID from the database to ensure it exists
        let userID;
        try {
            const userIDResult = await connection.query('SELECT UserID FROM tblUsers WHERE UserName = ?', [username]);
            if (!userIDResult || userIDResult.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            userID = userIDResult[0].UserID;
        } catch (error) {
            console.error('Error retrieving user ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        try {
            // Insert the new token into the database
            await connection.query('INSERT INTO tblEmailVerification (VerificationID, UserID, Token, ExpiresAt) VALUES (?, ?, ?, ?)', [uuidv4(), userID, verificationToken, expiresAt]);
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Resent Email Verification',
                html: `<p>Please verify your email by using the number below:</p><h2>${verificationToken}</h2>`
            });

            res.status(200).json({ message: 'Verification email resent successfully', verificationToken: verificationToken });
        } catch (error) {
            console.error('Error resending verification email:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error in resendVerification:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
};
