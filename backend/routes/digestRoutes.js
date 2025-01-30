const express = require('express');
const { sendDigestEmail } = require('../controllers/digestController');

const router = express.Router();

router.get('/send', async (req, res) => {
    try {
        await sendDigestEmail();
        res.status(200).send('Digest email sent successfully!');
    } catch (err) {
        res.status(500).send('Failed to send digest email.');
    }
});

module.exports = router;
