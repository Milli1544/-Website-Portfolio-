import express from "express";
import {
  signup,
  signin,
  signout,
  getCurrentUser,
} from "../controllers/authController.js";
import { requireSignin } from "../middleware/auth.middleware.js";
import { checkDBConnection } from "../middleware/dbCheck.js";

const router = express.Router();

// POST /api/auth/signup - Register new user
router.post("/signup", checkDBConnection, signup);

// POST /api/auth/signin - Login user
router.post("/signin", checkDBConnection, signin);

// GET /api/auth/signout - Logout user
router.get("/signout", signout);

// GET /api/auth/me - Get current user (protected route)
router.get("/me", requireSignin, getCurrentUser);

export default router;
