import express from "express"
import { userAlreadyLoggedIn } from "./auth/checkAuth";
import passport from "passport";
const authRouter = express.Router();

authRouter.get("/login", userAlreadyLoggedIn,  (req, res) => {
    res.send(`<div>pp</div>`)
})

authRouter.post("/login", passport.authenticate("local", { successRedirect: "/dashboard" }))

authRouter.get('/logout', (req, res) => {
    req.logout({}, () => {res.status(200).redirect("/login")})
});

authRouter.get('/login-failed', (req, res) => {
    res.status(401).json({ error: 'Login failed' });
});

export default authRouter