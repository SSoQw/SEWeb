import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

// TODO replace with database schema
const users = [
    {
        id: 1,
        username: 'test',
        password: '$2a$10$JGgrP.S2HZ.5B92DZ/z7Nerwyf/J6BzmcaPFa/1mvUPN78uMZmyzG',
        role: 'elevated',
    },
];

export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
}

export function initializePassport() {
    passport.use(
        new LocalStrategy((username, password, done) => {
            //TODO Replace with a database query to find the user by username
            const user = users.find((user) => user.username === username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) throw error;
                if (isMatch) {
                    return done(null, user); // Make sure the user object is of type User
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        })
    );


    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: number, done: any) => {
        // TODO Replace with database query to find the user by ID
        const user = users.find((user) => user.id === id);
        done(null, user);
    });
}

export default initializePassport;
