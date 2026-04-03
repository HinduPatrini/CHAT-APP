import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Update CORS to allow your specific Vercel frontend URL
app.use(cors({
  origin: "https://chat-app-three-ivory-46.vercel.app", 
  credentials: true
}));

app.use(express.json({ limit: "4mb" }));

// Socket.IO (Note: This will work locally, but will have issues on Vercel Serverless)
export const io = new Server(server, {
  cors: {
    origin: "https://chat-app-three-ivory-46.vercel.app",
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

// Routes
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Database connection logic for Serverless
const PORT = process.env.PORT || 5000;

// Connect to DB before listening
connectDB().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  }
});

export default app; // Export app for Vercel