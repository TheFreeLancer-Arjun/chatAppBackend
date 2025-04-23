import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connetion = await mongoose.connect("mongodb://admin:password@localhost:27017");
    console.log("MongoDB connected: " + connetion.connection.host);
  } catch (error) {
    console.log("MongoDB connection error: " + error);
  }
};
