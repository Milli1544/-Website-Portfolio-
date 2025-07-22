import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} from "../controllers/qualificationController.js";
import { requireSignin, requireAdmin } from "../middleware/auth.middleware.js";
import { checkDBConnection } from "../middleware/dbCheck.js";

const router = express.Router();

// Public routes - Anyone can view educations
router.get("/", checkDBConnection, getQualifications);
router.get("/:id", checkDBConnection, getQualificationById);

// Admin only routes
router.post("/", checkDBConnection, requireSignin, requireAdmin, createQualification);
router.put("/:id", checkDBConnection, requireSignin, requireAdmin, updateQualification);
router.delete("/:id", checkDBConnection, requireSignin, requireAdmin, deleteQualification);
router.delete("/", checkDBConnection, requireSignin, requireAdmin, deleteAllQualifications);

export default router;