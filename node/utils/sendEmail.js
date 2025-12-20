// server/utils/sendEmail.js

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Change if using SendGrid, Mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTP = async (recipientEmail, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'Your Registration OTP Code',
        html: `
            <h2>Email Verification</h2>
            <p>Thank you for registering. Please use the following code to verify your account:</p>
            <h1>${otp}</h1>
            <p>This code is valid for 10 minutes.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent successfully to ${recipientEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP email.');
    }
};

module.exports = sendOTP;