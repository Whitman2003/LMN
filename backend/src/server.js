//Required for Use
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Get the Routes
const userRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

//Where the app is ran
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});