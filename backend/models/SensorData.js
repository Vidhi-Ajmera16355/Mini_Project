const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  data: {
    type: Array,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);
module.exports = SensorData;
