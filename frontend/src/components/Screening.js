import React, { useState } from "react";
import axios from "axios";
import "./css/Screening.css";

const Screening = () => {
  const [formData, setFormData] = useState({
    eegAmplitude: "",
    deltaBandPower: "",
    thetaBandPower: "",
    alphaBandPower: "",
    betaBandPower: "",
    gammaBandPower: "",
    heartRate: "",
    respiratoryRate: "",
    bloodOxygenLevel: "",
    sleepHours: "",
    stressLevel: 5,
    activityLevel: "resting",
    seizureHistory: "",
    medication: "",
    timeWindow: "1",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/seizures/seizure-data", // Ensure the URL is correct
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token for authentication
          },
        }
      );
      console.log("Response:", response.data);
      if (response.status === 201) {
        setIsModalOpen(true); // Display success modal
      }
    } catch (error) {
      console.error("Error submitting data:", error.response || error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Hide modal
  };

  // Array of form fields with labels and other properties
  const formFields = [
    { name: "eegAmplitude", label: "EEG Amplitude (μV):", type: "number" },
    {
      name: "deltaBandPower",
      label: "Delta Band Power (μV²):",
      type: "number",
    },
    {
      name: "thetaBandPower",
      label: "Theta Band Power (μV²):",
      type: "number",
    },
    {
      name: "alphaBandPower",
      label: "Alpha Band Power (μV²):",
      type: "number",
    },
    { name: "betaBandPower", label: "Beta Band Power (μV²):", type: "number" },
    {
      name: "gammaBandPower",
      label: "Gamma Band Power (μV²):",
      type: "number",
    },
    { name: "heartRate", label: "Heart Rate (bpm):", type: "number" },
    {
      name: "respiratoryRate",
      label: "Respiratory Rate (breaths per minute):",
      type: "number",
    },
    {
      name: "bloodOxygenLevel",
      label: "Blood Oxygen Level (SpO2 %):",
      type: "number",
    },
    {
      name: "sleepHours",
      label: "Hours of Sleep in Last 24 Hours:",
      type: "number",
    },
    {
      name: "stressLevel",
      label: "Stress Level (1-10):",
      type: "range",
      min: 1,
      max: 10,
    },
    {
      name: "activityLevel",
      label: "Current Activity Level:",
      type: "select",
      options: ["resting", "active"],
    },
    {
      name: "seizureHistory",
      label: "Number of Seizures in Last 30 Days:",
      type: "number",
    },
    {
      name: "medication",
      label: "Currently Taking Anticonvulsant Medication?",
      type: "radio",
      options: ["yes", "no"],
    },
    {
      name: "timeWindow",
      label: "Select Time Window for Monitoring:",
      type: "select",
      options: ["1 minute", "5 minutes", "10 minutes"],
    },
  ];

  return (
    <div className="form-container">
      <h2>Seizure Prediction Input Form</h2>
      <form onSubmit={handleSubmit} className="features-form">
        {formFields.map((field, index) => (
          <div
            key={field.name}
            className={`form-group ${
              currentStep === index + 1 ? "show" : "hidden"
            }`}
          >
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "number" || field.type === "range" ? (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                min={field.min}
                max={field.max}
                required
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              >
                {field.options.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              field.options.map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={`${field.name}${option}`}
                    name={field.name}
                    value={option.toLowerCase()}
                    onChange={handleChange}
                  />
                  <label htmlFor={`${field.name}${option}`}>{option}</label>
                </div>
              ))
            )}
            {currentStep === index + 1 && (
              <button
                type="button"
                className="next-btn"
                onClick={handleNextStep}
              >
                Next
              </button>
            )}
          </div>
        ))}
        {currentStep > formFields.length && (
          <button type="submit" className="submit-btn">
            Submit
          </button>
        )}
      </form>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Submission Successful!</h3>
            <p>Your data has been successfully submitted.</p>
            <button onClick={closeModal} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Screening;
