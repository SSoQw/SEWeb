import fs from "fs";
import cors from "cors"
import express from 'express';
import session from "express-session";
import mapboxgl from "mapbox-gl";
import fetch from 'node-fetch';
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import passport, { AuthenticateCallback } from 'passport';
import { initializePassport } from "./components/auth/passport.js";
import LocalUsers, { User } from "./models/user.js";
import { sendEmail } from "./components/mail/mailer.js";
import { userAlreadyLoggedIn, userIsValid } from "./components/auth/checkAuth.js";

const app = express();
const port = 3000;

const secret = "abc" // pls put in .env

// Bodyparser middleware for routes to accept JSON
app.use(
bodyParser.urlencoded({
    extended: false,
})
);
app.use(bodyParser.json({ limit: "1000mb" }));

app.use(
session({
    secret: secret,
    name: "session",
    resave: false,
    saveUninitialized: true,
})
);

// Parse request body as JSON
app.use(express.json({ limit: "200mb" }));

// Use cookies
app.use(cookieParser(secret));

// Use cors
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
let usersDB = new LocalUsers();

initializePassport(passport, usersDB);

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
app.post('/api/send-email', async (req, res) => {
    try {
        await sendEmail(req.body);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
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

app.get("/login", userAlreadyLoggedIn,  (req, res) => {
    res.send(`<div>pp</div>`)
})

app.post("/login", async (req, res, next) => {
    passport.authenticate("local", { successRedirect: "/dashboard" })(req, res, next)
})

app.get('/logout', (req, res) => {
    req.logout({}, () => {res.status(200).redirect("/login")})
});

app.get('/login-failed', (req, res) => {
    res.status(401).json({ error: 'Login failed' });
});

app.get('/dashboard', userIsValid, async (req, res) => {
    const user = req.user as User
    console.log("req.user", user)
    res.status(200).json({ testimonials: [
        { message: "lksjflksjfklsd", user: user.username},
        { message: "wffasfsefasef", user: user.username},
        { message: "sefsfsfsefsefsef", user: user.username},
        { message: "sefsegagarhsdhs", user: user.username},
    ]})
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
