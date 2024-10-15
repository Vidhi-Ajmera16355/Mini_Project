const mongoose = require("mongoose");

const seizureEventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
});

const SeizureEvent = mongoose.model("SeizureEvent", seizureEventSchema);
module.exports = SeizureEvent;
