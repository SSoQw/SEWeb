import express from 'express';
import nodemailer from 'nodemailer';
import {LngLat} from "mapbox-gl";

const app = express();
const port = 22222;

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'exchange-server',
    port: 587,
    secure: true,
    auth: {
        user: 'leads@sellickelectric.com',
        pass: `${process.env.REACT_APP_MAIL_APP_PASS}`,
    },
});

//Endpoint for MapBox Gecode API
app.post('/api/geocode', async (req, res) => {
    const { partialAddress } = req.body;
    const center = new LngLat(43.597532, -70.709917);
    try{
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(partialAddress)}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&country=us&proximity=${center.lng},${center.lat}&limit=4`
        );
        const data = await response.json();
        const addresses = data.features
            .filter((feature: any) => feature.place_type.includes('address'))
            .map((feature: any) => feature.place_name);
        res.json({ addresses });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to geocode address' });
    }
});

// Endpoint to handle form submissions
app.post('/api/send-email', (req, res) => {
    const { name, email, phone, address, workProposal } = req.body;

    // Compose the email message
    const message = {
        from: 'leads@sellickelectric.com',
        to: 'leads@sellickelectric.com',
        subject: 'New Lead From Website',
        text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}
      Work Proposal: ${workProposal}
    `,
    };

    // Send the email using Nodemailer
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
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
