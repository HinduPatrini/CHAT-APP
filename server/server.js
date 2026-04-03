import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser"; // Added: Required for cookies
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// --- MIDDLEWARES ---
// Increased limit slightly for base64 images (profile pics)
app.use(express.json({ limit: "5mb" })); 
app.use(cookieParser()); // Added: MUST have this to send/read JWT cookies

// --- CORS CONFIGURATION ---
app.use(cors({
  origin: "https://chat-app-three-ivory-46.vercel.app", 
  credentials: true, // Added: Required for cookies to pass between front/back
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// --- SOCKET.IO SETUP ---
export const io = new Server(server, {
  cors: {
    origin: "https://chat-app-three-ivory-46.vercel.app",
    credentials: true, // Added: Required for socket auth with cookies
    methods: ["GET", "POST"],
  },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// --- ROUTES ---
app.get("/", (req, res) => res.send("Server is running on Vercel"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// --- SERVER START LOGIC ---
const PORT = process.env.PORT || 5000;

// Connect to DB once
const startServer = async () => {
  try {
    await connectDB();
    // Only listen manually if NOT on Vercel (Production)
    if (process.env.NODE_ENV !== 'production') {
      server.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
      });
    }
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};

startServer();

// CRITICAL for Vercel: Export the app
export default app;