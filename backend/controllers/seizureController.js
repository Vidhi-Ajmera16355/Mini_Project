const SeizureEvent = require("../models/SeizureEvent");

// Create a seizure event
exports.createSeizureEvent = async (req, res) => {
  const { userId, description } = req.body;

  try {
    const seizureEvent = new SeizureEvent({ userId, description });
    await seizureEvent.save();
    res.status(201).json(seizureEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all seizure events for a user
exports.getSeizureEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await SeizureEvent.find({ userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
