import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from "../controllers/contactController.js";
import { requireSignin, requireAdmin } from "../middleware/auth.middleware.js";
import { checkDBConnection } from "../middleware/dbCheck.js";

const router = express.Router();

// Public routes
router.post("/", checkDBConnection, createContact); // Anyone can create contact

// Protected routes - Users can view, only admins can modify
router.get("/", checkDBConnection, requireSignin, getContacts);
router.get("/:id", checkDBConnection, requireSignin, getContactById);

// Admin only routes
router.put("/:id", checkDBConnection, requireSignin, requireAdmin, updateContact);
router.delete("/:id", checkDBConnection, requireSignin, requireAdmin, deleteContact);
router.delete("/", checkDBConnection, requireSignin, requireAdmin, deleteAllContacts);

export default router;