import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// --- MIDDLEWARES ---
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// --- CORS CONFIGURATION ---
const CLIENT_URL =
  process.env.CLIENT_URL ||
  "https://chat-app-three-ivory-46.vercel.app";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// --- SOCKET.IO SETUP ---
export const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// --- ROUTES ---
app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// --- SERVER START ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const startServer = async () => {
  try {
    await connectDB();
    console.log("Database Connected");

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};

startServer();

export default server;