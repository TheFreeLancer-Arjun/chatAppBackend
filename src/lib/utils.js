import jwt from "jsonwebtoken";

export const generateToken = (userID, res) => {
  const token = jwt.sign({ userID }, myscretkey, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    httpOnly: true, //prevent xss attack
    sameSite: "strict", // CSRF attack
    secure:  true, //https only in production
  });

  return token;
};
