// seizureController.js
const SeizureEvent = require("../models/SeizureEvent");

exports.createSeizureEvent = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve userId from req.user
    const formData = req.body; // This includes all fields except userId

    const event = new SeizureEvent({
      userId, // Attach userId automatically from authMiddleware
      ...formData,
    });

    await event.save();
    res.status(201).json({ message: "Event saved successfully", event });
  } catch (error) {
    res.status(400).json({ message: "Error saving event", error });
  }
};

// Get all seizure events for a user
exports.getSeizureEvents = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve userId from req.user (set by authMiddleware)

    const events = await SeizureEvent.find({ userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
