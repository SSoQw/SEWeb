import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import LocalUsers, { User } from "./models/user.js";
import { PassportStatic } from "passport";

const passportStrategyOptions: LocalStrategy.IStrategyOptions = {
    usernameField: "email",
    passwordField: "password"
}

const userCredsInvalidMsg = { message: "Email or password is incorrect" } as const
const validateUser = (password: string, dbpassword: string) => bcrypt.compareSync(password, dbpassword)
const verify = (db: LocalUsers): LocalStrategy.VerifyFunction => async (email, password, done) => {
    const user = db.findUser(email);
    if(user) {
        validateUser(password, user.password) 
            ? done(null, user) 
            : done(null, false, userCredsInvalidMsg)
    } else {
        done(null, false, userCredsInvalidMsg)
    }
}

export function initializePassport(passport: PassportStatic, usersDB: LocalUsers) {
    passport.use(new LocalStrategy.Strategy(passportStrategyOptions, verify(usersDB)));

    passport.serializeUser((user: Express.User, cb) => cb(user))

    passport.deserializeUser((user: User, done) => {
        const u = usersDB.findUser(user.email);
        done(null, u);
    });
}