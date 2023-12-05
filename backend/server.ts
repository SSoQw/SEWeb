import cors from "cors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { initializePassport } from "./components/auth/passport.js";
import LocalUsers from "./models/user.js";
import authRouter from "./components/auth/authRouter.js";
import mailRouter from "./components/mail/mailerRouter.js";
import geoRouter from "./components/geocode/geoRouter";
import dataRouter from "./components/siteData/dataRouter";
import { dconfig } from "./config.js";


const app = express();
const port = dconfig.nport;

const secret = `${dconfig.secret}`;

const sessionConfig = {
  secret: secret,
  name: dconfig.cookiename,
  resave: false,
  saveUninitialized: true,
};
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true 
};
const initMiddleware = () => [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json({ limit: "10mb" }),
  session(sessionConfig),
  express.json({ limit: "10mb" }),
  cookieParser(secret),
  cors(corsConfig),
].map(mw => app.use(mw));
// if you don't call initMiddleware you will not have middleware
initMiddleware();

const initPassport = () => [
  passport.initialize(),
  passport.session(),
].map(mw => app.use(mw));
initPassport();
const usersDB = new LocalUsers(); // this should point to postgres instance eventually
initializePassport(passport, usersDB);

// routing
app.use("/api", geoRouter);
app.use("/api", mailRouter);
app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
