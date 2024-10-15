const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const seizureRoutes = require("./routes/seizureRoutes");
const userRoutes = require("./routes/userRoutes");
const initSocket = require("./utils/socket");

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/seizures", seizureRoutes);
app.use("/api/users", userRoutes);

// Initialize Socket.io
const io = initSocket(server);

// Server listening on port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
