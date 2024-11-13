const express = require("express");
const router = express.Router();
const {
  createSeizureEvent,
  getSeizureEvents,
} = require("../controllers/seizureController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/seizure-data", authMiddleware, createSeizureEvent); // POST route for creating seizure events
router.get("/", authMiddleware, getSeizureEvents); // GET route for retrieving seizure events (no userId needed in URL)

module.exports = router;
