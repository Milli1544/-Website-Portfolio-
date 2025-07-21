import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} from "../controllers/projectController.js";

const router = express.Router();

// Routes
router
  .route("/")
  .get(getProjects)
  .post(createProject)
  .delete(deleteAllProjects);

router
  .route("/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;
