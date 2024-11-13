const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const seizureRoutes = require("./routes/seizureRoutes"); // Updated to renamed route file
const userRoutes = require("./routes/userRoutes");
const initSocket = require("./utils/socket");

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Your React frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow sending cookies
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/seizures", seizureRoutes); // Updated to renamed route file
app.use("/api/users", userRoutes);

// Initialize Socket.io
const io = initSocket(server);

// Global Error Handling (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Server listening on port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
