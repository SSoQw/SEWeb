import mapboxgl from "mapbox-gl";
import fs from "fs";
import express from 'express';
import session from "express-session";
import nodemailer from 'nodemailer';
import passport from 'passport';
import fetch from 'node-fetch';
import { initializePassport, isAuthenticated } from "./passportmw.js";


const app = express();
const port = 22222;

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: "secret secret that is secret",
    resave: false,
    saveUninitialized: false
}));
initializePassport(app);

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
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
    const center = new mapboxgl.LngLat(43.597532, -70.709917);
    try{
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(partialAddress)}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&country=us&proximity=${center.lng},${center.lat}&limit=4`
        );
        const data = await response.json();
        // @ts-ignore
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

// Endpoint that gets current services
app.post('/api/services', (req, res) => {
    try {
        const data = fs.readFileSync('services.json', 'utf8');
        const services = JSON.parse(data);
        res.json({ services });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to retrieve services data' });
    }
});
// Endpoint that gets current testimonials
app.post('/api/testimonials', (req, res) => {
    try{
        const data = fs.readFileSync('testimonials.json', 'utf8');
        const testimonials = JSON.parse(data);
        res.json({ testimonials });
    }catch(error){
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to retrieve testimonials data' });
    }
});
// Endpoint that gets current FAQs
app.post('/api/faqs', (req, res) => {
    try{
        const data = fs.readFileSync('questions.json', 'utf8');
        const faqs = JSON.parse(data);
        res.json({ faqs });
    } catch(error){
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Failed to retrieve FAQs data' });
    }
});

app.post(
    '/dashboard/login',
    passport.authenticate('local', { failureRedirect: '/login-failed' }),
    (req, res) => {
        res.status(200).json({ message: 'Login successful' });
    }
);

app.get('/dashboard/logout', (req, res) => {
    req.logout({} as passport.LogOutOptions, (err: any) => {
        if (err) {
            res.status(500).json({ error: 'Failed to logout' });
        } else {
            res.status(200).json({ message: 'Logout successful' });
        }
    });
});

app.get('/login-failed', (req, res) => {
    res.status(401).json({ error: 'Login failed' });
});

app.post('/dashboard', isAuthenticated, (req, res) => {
    if (req.user && req.user === 'elevated') {
        // TODO Dashboard user if authorized to add testimonials
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
