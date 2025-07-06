const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test Routes for Setup
app.get('/api/v1', (req, res) => {
    res.json({message: 'Server is running'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});