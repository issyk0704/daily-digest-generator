const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // SSL port for Gmail
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL, // Gmail address
        pass: process.env.EMAIL_PASSWORD, // App Password
    },
    debug: true, // Enable debug output
    logger: true, // Log SMTP details
});

const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Test Email from Nodemailer',
    text: 'This is a test email to verify Gmail SMTP configuration.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
