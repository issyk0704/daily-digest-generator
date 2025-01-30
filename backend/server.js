const app = require('./app'); // Import the app instance
const cron = require('node-cron');
const { sendDigestEmail } = require('./controllers/digestController');

const PORT = process.env.PORT || 5000;

// Schedule emails at 8 AM, 12 PM, 4 PM, 8 PM, and 12 AM
const scheduleTimes = ['0 8 * * *', '0 12 * * *', '0 16 * * *', '0 20 * * *', '0 0 * * *'];
scheduleTimes.forEach((time) => {
    cron.schedule(time, async () => {
        console.log(`Running scheduled email job for ${time}...`);
        await sendDigestEmail();
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
