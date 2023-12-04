import express from "express";
import { userAlreadyLoggedIn } from "./checkAuth.js";
import passport from "passport";
const authRouter = express.Router();

authRouter.get("/login", userAlreadyLoggedIn,  (req, res) => {
  res.status(200).json({ message: "Login successful" });
});

authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: string, user: string) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {res.status(200).json({ message: "See you next time" });});
});

authRouter.get("/login-failed", (req, res) => {
  res.status(401).json({ error: "Login failed" });
});

export default authRouter;