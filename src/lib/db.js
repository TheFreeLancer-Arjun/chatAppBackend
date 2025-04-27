import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connetion = await mongoose.connect("mongodb+srv://ajinkyashinde7756:BvqWvwRCRSzCQcDo@chatapp.clfnt3i.mongodb.net/");
    console.log("MongoDB connected: " + connetion.connection.host);
  } catch (error) {
    console.log("MongoDB connection error: " + error);
  }
};
