import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} from "../controllers/projectController.js";
import { requireSignin, requireAdmin } from "../middleware/auth.middleware.js";
import { checkDBConnection } from "../middleware/dbCheck.js";

const router = express.Router();

// Public routes - Anyone can view projects
router.get("/", checkDBConnection, getProjects);
router.get("/:id", checkDBConnection, getProjectById);

// Admin only routes
router.post("/", checkDBConnection, requireSignin, requireAdmin, createProject);
router.put("/:id", checkDBConnection, requireSignin, requireAdmin, updateProject);
router.delete("/:id", checkDBConnection, requireSignin, requireAdmin, deleteProject);
router.delete("/", checkDBConnection, requireSignin, requireAdmin, deleteAllProjects);

export default router;