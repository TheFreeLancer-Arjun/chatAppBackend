import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["https://chat-app-frontend-zeta-lyart.vercel.app"],
  },
});

export function getReceiverSocketId (userId){
    return userSocketMap[userId];
}

const userSocketMap = {}; // userId -> socket.id

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; //  Store userId in socket
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (socket.userId) {
      delete userSocketMap[socket.userId]; //  Now we have userId
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});
