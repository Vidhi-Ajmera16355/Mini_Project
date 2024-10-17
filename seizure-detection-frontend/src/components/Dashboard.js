import { useEffect, useState } from "react";
import api from "../services/api";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSeizureEvents = async () => {
      const response = await api.get(`/seizures/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvents(response.data);
    };

    if (user) {
      fetchSeizureEvents();
    }
  }, [user]);

  return (
    <div>
      <h2>Seizure Alerts</h2>
      <Alert />
      <h2>Seizure Event History</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.description} - {new Date(event.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
