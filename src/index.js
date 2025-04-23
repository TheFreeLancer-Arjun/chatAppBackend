import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";



const PORT = process.env.PORT;


app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-app-frontend-zeta-lyart.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);



app.listen(5000, '0.0.0.0', () => {
  console.log("Server is running on port 5000");



  connectDB();
});
