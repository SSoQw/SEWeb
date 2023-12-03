import fs from "fs";
import cors from "cors"
import express from 'express';
import session from "express-session";
import mapboxgl from "mapbox-gl";
import fetch from 'node-fetch';
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import passport from 'passport';
import { initializePassport } from "./components/auth/passport.js";
import LocalUsers from "./models/user.js";
import authRouter from "./components/auth/authRouter.js"
import mailRouter from "./components/mail/mailerRouter.js"
import { dconfig } from "./config.js";

const app = express();
const port = dconfig.nport;

const secret = `${dconfig.secret}`;

const sessionConfig = {
    secret: secret,
    name: dconfig.cookiename,
    resave: false,
    saveUninitialized: true,
}
const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true 
}
const initMiddleware = () => [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json({ limit: "10mb" }),
    session(sessionConfig),
    express.json({ limit: "10mb" }),
    cookieParser(secret),
    cors(corsConfig),
].map(mw => app.use(mw));
// if you don't call initMiddleware you will not have middleware
initMiddleware()

const initPassport = () => [
    passport.initialize(),
    passport.session(),
].map(mw => app.use(mw))
initPassport()
let usersDB = new LocalUsers(); // this should point to postgres instance eventually
initializePassport(passport, usersDB);

// routing
app.use("/api", mailRouter)
app.use("/api/auth", authRouter)

// MISC ROUTES todo silo

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
