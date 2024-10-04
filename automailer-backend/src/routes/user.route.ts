import { Router } from "express";
import { confirmRSVP, sendEntries, sendMail } from "../controllers/user.controller";

const router = Router();

// Set up routes
router.get("/rsvp/:token", confirmRSVP);
router.post("/sendEntries", sendEntries);
router.post("/sendMail", sendMail);

export default router;
