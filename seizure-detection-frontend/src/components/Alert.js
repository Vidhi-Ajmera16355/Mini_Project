import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Alert = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("seizure_alert", (message) => {
      setAlert(message);
    });

    return () => socket.disconnect();
  }, []);

  return <div>{alert ? <p>{alert}</p> : <p>No alerts</p>}</div>;
};

export default Alert;
