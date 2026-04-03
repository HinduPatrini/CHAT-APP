import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // 1. Create the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Good practice to add an expiration
  });

  // 2. Set the cookie in the response
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevents XSS attacks (cannot be read by JS)
    sameSite: "none", // REQUIRED for Chrome/Vercel to accept cross-site cookies
    secure: true, // REQUIRED for HTTPS (Vercel always uses HTTPS)
  });

  return token;
};