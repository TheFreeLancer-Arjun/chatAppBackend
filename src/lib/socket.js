import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["https://d2yb8enwwp04s1.cloudfront.net/signup"],
  },
});

// Store for userId -> socket.id
const userSocketMap = {}; 

// Function to get the receiver's socket id
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  // Validate userId before adding to map
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // Store userId in socket
    console.log(`User with ID ${userId} connected`);
  } else {
    console.log("User ID not provided in connection request");
  }

  // Emit the list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (socket.userId) {
      delete userSocketMap[socket.userId]; // Remove userId from map
      console.log(`User with ID ${socket.userId} disconnected`);
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users list
    }
  });

  // Optionally, handle errors for socket connections
  socket.on("error", (err) => {
    console.error("Socket error:", err);
    socket.emit("error", { message: "Something went wrong!" });
  });
});
