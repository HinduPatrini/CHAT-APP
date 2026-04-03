import express from "express";
import {
  login,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/signup", signup);
userRouter.post("/login", login);

// Protected routes
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;