const transporter = require('../config/email');
const { fetchDigestData } = require('../utils/digestData');

const sendDigestEmail = async () => {
    try {
        const digest = await fetchDigestData();

        const emailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <div style="text-align: center; background-color: #4CAF50; padding: 10px 20px; border-radius: 8px 8px 0 0; color: white;">
                    <h1 style="margin: 0;">Daily Digest</h1>
                    <p style="margin: 0; font-size: 14px;">Your personalized news and market updates</p>
                </div>
                <div style="padding: 20px;">
                    <h2 style="color: #333;">📰 News:</h2>
                    <ul style="padding-left: 20px; color: #555; font-size: 14px;">
                        ${digest.news
                            .map(
                                (article) =>
                                    `<li><a href="${article.url}" style="color: #4CAF50; text-decoration: none;">${article.title}</a></li>`
                            )
                            .join('')}
                    </ul>
                    
                    <h2 style="color: #333;">📈 Stocks:</h2>
                    <p style="color: #555; font-size: 14px;">NVDA: ${digest.nvda}</p>

                    <h2 style="color: #333;">📊 Indices:</h2>
                    <ul style="padding-left: 20px; color: #555; font-size: 14px;">
                        ${digest.indices
                            .map((index) => `<li>${index.name}: ${index.price}</li>`)
                            .join('')}
                    </ul>

                    <h2 style="color: #333;">💱 Currency Pairs:</h2>
                    <ul style="padding-left: 20px; color: #555; font-size: 14px;">
                        ${digest.currencies
                            .map((currency) => `<li>${currency.pair}: ${currency.rate}</li>`)
                            .join('')}
                    </ul>
                </div>
                <div style="text-align: center; padding: 10px 20px; background-color: #f1f1f1; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0; font-size: 12px; color: #999;">You are receiving this email as part of your subscription to Daily Digest.</p>
                    <p style="margin: 0; font-size: 12px; color: #999;">To unsubscribe, click <a href="#" style="color: #4CAF50;">here</a>.</p>
                </div>
            </div>
        `;

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Your Daily Market Digest',
            html: emailContent,
        });

        console.log('Email sent successfully:', info.response);
    } catch (err) {
        console.error('Error sending email:', err.message);
    }
};

module.exports = { sendDigestEmail };
