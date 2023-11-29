import express from "express";
import { mailer } from "./mail/mailer";
const mailRouter = express.Router();

mailRouter.post('/send-email', mailer);

export default mailRouter;