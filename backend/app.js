const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const digestRoutes = require('./routes/digestRoutes');

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express(); // Create the Express app

app.use(express.json()); // Middleware to parse JSON requests
app.use('/api/digest', digestRoutes); // Define routes for digest

module.exports = app; // Export the app instance
