const { Server } = require("socket.io");

const initSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // Emit dummy seizure alert after 10 seconds for testing
    setTimeout(() => {
      socket.emit("seizure_alert", "Simulated seizure detected! Take action.");
    }, 10000);
  });

  return io;
};

module.exports = initSocket;
