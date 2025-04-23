import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Get JWT secret from environment variables
const JWT_SECRET = "myscretkey"; // fallback to default key if env var not set

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - no token provided" });
    }

    // Verify token and handle expiry
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Token expired" });
      }
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Find the user associated with the token
    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to the request object for further use in routes
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
