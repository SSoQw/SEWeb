import express from "express";
import { getSiteData } from "./siteData.js";

const router = express.Router();

//todo: Format these as database calls able to fallback to json in public folder
router.post("/services", (req, res) => {
  try {
    const services = getSiteData("services.json");
    res.json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve services data" });
  }
});

router.post("/testimonials", (req, res) => {
  try {
    const testimonials = getSiteData("testimonials.json");
    res.json({ testimonials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve testimonials data" });
  }
});

router.post("/faqs", (req, res) => {
  try {
    const faqs = getSiteData("questions.json");
    res.json({ faqs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve FAQs data" });
  }
});

export default router;
