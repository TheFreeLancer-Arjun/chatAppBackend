import jwt from "jsonwebtoken";

// Get JWT_SECRET from environment variables
const JWT_SECRET = "myscretkey"; // fallback to default key if env var is not set

export const generateToken = (userID, res) => {
  try {
    // Generate the JWT token
    const token = jwt.sign({ userID }, JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    // Set the cookie with the JWT token
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds
      httpOnly: true, // Prevent XSS attacks
      sameSite: "strict", // Protect against CSRF attacks
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
