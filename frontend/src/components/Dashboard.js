import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the backend for real-time alerts

function Dashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response.data.message
        );
      }
    };

    const fetchSeizureEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/seizures/${user?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error(
          "Error fetching seizure events:",
          error.response.data.message
        );
      }
    };

    fetchUserProfile();
    fetchSeizureEvents();

    // Listen for real-time seizure alerts from the backend
    socket.on("seizure_alert", (message) => {
      setAlert(message);
      alert(message); // Show browser alert
    });

    return () => socket.disconnect(); // Cleanup the socket connection on unmount
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      {user && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold">Welcome, {user.email}</h3>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-semibold mb-4">Seizure Events</h3>
        {events.length > 0 ? (
          <ul className="list-disc pl-6">
            {events.map((event, index) => (
              <li key={index}>{event.description}</li>
            ))}
          </ul>
        ) : (
          <p>No events recorded.</p>
        )}
      </div>

      {alert && (
        <div className="bg-red-500 text-white p-4 rounded-lg mt-6">
          <h3 className="text-xl font-bold">Real-Time Alert</h3>
          <p>{alert}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
