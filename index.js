import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import fabricRouter from "./routes/fabric.route.js";
import messageRouter from "./routes/message.route.js";
import conversationRouter from "./routes/conversation.route.js";
import supplyRouter from "./routes/supply.route.js"; // Import the supply router
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!!!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// CORS middleware configuration
app.use(
  cors({
    origin: "*",
    // origin: [
    //   "http://localhost:8081", // Your frontend URL
    //   "http://192.168.0.155:8081", // Example IP address of a mobile app
    // ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Include other methods if necessary
    credentials: true, // Allow credentials if needed
  })
);

app.use(express.json());
app.use(cookieParser());

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io with CORS
const io = new Server(server, {
  // cors: {
  //   origin: ["http://localhost:8081", "http://192.168.2.16:3000"],
  //   methods: ["GET", "POST"],
  //   credentials: true,
  // },
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

//testing route
app.get("/", (_req, res) => {
  res.json({ message: "Backend server is running!" });
});

// Use routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/fabric", fabricRouter);
app.use("/api/message", messageRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/supply", supplyRouter);


// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Service running on port ${PORT}!!!`);
});

export { io };