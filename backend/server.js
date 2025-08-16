const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mariadb = require('mariadb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

// Test Route for Setup
app.get('/api/v1', (req, res) => {
    res.json({message: 'Server is running'});
});

// Test Route for DB
app.get('/api/v1/test-db', async (req, res) => {
    console.log(process.env.DB_HOST);
    let connection;
    try {
        connection = await pool.getConnection();
        const rows = await connection.query('SELECT 1 + 1 AS solution');
        res.json({message: 'DB is connected', solution: rows[0].solution});
    } catch (error) {
        res.status(500).json({message: 'DB connection failed', error: error.message});
    } finally {
        if (connection) connection.release();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});