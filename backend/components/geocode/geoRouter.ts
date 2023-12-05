import express from "express";
import { geocodeAddress } from "./geocode.js";

const router = express.Router();

router.post("/geocode", async (req, res) => {
  const { partialAddress } = req.body;

  try {
    const mapboxData = await geocodeAddress(partialAddress);
    res.json({ mapboxData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to geocode address" });
  }
});

export default router;
