const dotenv = require('dotenv');
dotenv.config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // SSL port
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL, // Gmail address
        pass: process.env.EMAIL_PASSWORD, // Gmail App Password
    },
    debug: true, // Enable debugging output
    logger: true, // Log connection details
});

module.exports = transporter;

