const express = require("express");
const router = express.Router();
const {
  createSeizureEvent,
  getSeizureEvents,
} = require("../controllers/seizureController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createSeizureEvent);
router.get("/:userId", authMiddleware, getSeizureEvents);

module.exports = router;
