import * as passportStrategy from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Express, Request, Response, NextFunction } from "express";
import { IUser } from "./models/user";
import LocalUsers from "./models/user";

const passportStrategyOptions: passportStrategy.IStrategyOptions = {
    usernameField: "email",
    passwordField: "password"
}

const userCredsInvalidMsg = { message: "Email or password is incorrect"}
const validateUser = (password: string, dbpassword: string) => bcrypt.compareSync(password, dbpassword) 
const verify = (db: LocalUsers): passportStrategy.VerifyFunction => async (email, password, done) => {
    const user = db.findUser(email);
    if(user) {
        validateUser(password, user.password) 
            ? done(null, user) 
            : done(null, false, userCredsInvalidMsg)
    } else {
        done(null, false, userCredsInvalidMsg)
    }
}

export function initializePassport(app: Express) {
    const usersDB = new LocalUsers();
    usersDB.initUsers();
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.use(new passportStrategy.Strategy(passportStrategyOptions, verify(usersDB)));

    passport.serializeUser((user, cb) => cb(user))

    passport.deserializeUser((user: IUser, done) => {
        const u = usersDB.findUser(user.email);
        done(null, u);
    });
}

export function isAuthenticated(req: Request ,res: Response, next: NextFunction): Response | void {
    if(req.user)
        return next();
    else
        res.redirect("/");
}

