import React from "react";
import "./css/Home.css"; // Import the CSS file for Home page styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Seizure Detection App</h1>
      <p>
        This app helps you monitor your health metrics and assess seizure risk
        based on various health parameters.
      </p>
      <p>
        Use the Input page to submit your data and get personalized insights.
      </p>
    </div>
  );
};

export default Home;
