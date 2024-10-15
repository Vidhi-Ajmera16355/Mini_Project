import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { socket } from "../sockets/socket";

function Dashboard() {
  const [eegData, setEegData] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    socket.on("eeg_data", (data) => {
      setEegData((prevData) => [...prevData.slice(-49), data]);
    });

    socket.on("seizure_alert", (message) => {
      setAlert(message);
    });

    return () => {
      socket.off("eeg_data");
      socket.off("seizure_alert");
    };
  }, []);

  const chartData = {
    labels: Array.from({ length: eegData.length }, (_, i) => i),
    datasets: [
      {
        label: "EEG Data",
        data: eegData,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h3>Real-Time EEG Monitoring</h3>
      <Line data={chartData} />
      {alert && <div style={{ color: "red" }}>{alert}</div>}
    </div>
  );
}

export default Dashboard;
