import express from "express";
import { mailer } from "./mailer.js";
const mailRouter = express.Router();

mailRouter.post("/send-email", mailer);

export default mailRouter;