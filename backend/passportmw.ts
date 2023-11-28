import * as passportStrategy from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Express, Request, Response, NextFunction } from "express";
import { User, IUser } from "./models/user";

export function initializePassport(app: Express) {
    const usersDB = new User();
    usersDB.initUsers();
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.use(new passportStrategy.Strategy(
        { usernameField: "email"}, async (email, password, done) => {
            try {
                if (!email) { done(null, false) }
                const user = usersDB.findUser(email);
                if (user.email === email && await bcrypt.compare(password, (user.password).toString())) {
                    done(null, usersDB.users[0]);
                } else {
                    done(null, false, { message: "User or password incorrect"});
                }
            } catch (e) {
                done(e);
            }
        }));

    passport.serializeUser((req: Request, user: IUser, done) => {
        done(null, user);
    });


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

