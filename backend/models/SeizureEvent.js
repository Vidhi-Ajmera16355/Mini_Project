const mongoose = require("mongoose");

const seizureEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    eegAmplitude: Number,
    deltaBandPower: Number,
    thetaBandPower: Number,
    alphaBandPower: Number,
    betaBandPower: Number,
    gammaBandPower: Number,
    heartRate: Number,
    respiratoryRate: Number,
    bloodOxygenLevel: Number,
    sleepHours: Number,
    stressLevel: Number,
    activityLevel: String,
    seizureHistory: Number,
    medication: String,
    timeWindow: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SeizureEvent", seizureEventSchema);
