import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 22222;

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'your-exchange-server',
    port: 587,
    secure: true,
    auth: {
        user: 'your-email@example.com',
        pass: 'your-password',
    },
});

// Endpoint to handle form submissions
app.post('/api/send-email', (req, res) => {
    const { name, email, phone, workProposal } = req.body;

    // Compose the email message
    const message = {
        from: 'your-email@example.com',
        to: 'your-inbox@example.com', // Update this with your target inbox email or distribution list
        subject: 'New Lead From Website',
        text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Work Proposal: ${workProposal}
    `,
    };

    // Send the email using Nodemailer
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error('Error occurred while sending email:', err);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent successfully:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
