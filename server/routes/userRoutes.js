import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../controllers/userController.js";
import { requireSignin, requireAdmin, hasAuthorization } from "../middleware/auth.middleware.js";
import { checkDBConnection } from "../middleware/dbCheck.js";

const router = express.Router();

// Admin only routes
router.get("/", checkDBConnection, requireSignin, requireAdmin, getUsers);
router.post("/", checkDBConnection, requireSignin, requireAdmin, createUser);
router.delete("/", checkDBConnection, requireSignin, requireAdmin, deleteAllUsers);

// Protected routes - Users can view their own profile, admins can view any
router.get("/:id", checkDBConnection, requireSignin, getUserById);

// Admin or owner can update/delete
router.put("/:id", checkDBConnection, requireSignin, hasAuthorization, updateUser);
router.delete("/:id", checkDBConnection, requireSignin, requireAdmin, deleteUser);

export default router;