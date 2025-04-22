import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  try {
    const connetion = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected: " + connetion.connection.host);
  } catch (error) {
    console.log("MongoDB connection error: " + error);
  }
};
