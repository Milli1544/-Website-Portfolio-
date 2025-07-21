import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Routes - All protected with authentication
router
  .route("/")
  .get(protect, getContacts)
  .post(protect, createContact)
  .delete(protect, deleteAllContacts);

router
  .route("/:id")
  .get(protect, getContactById)
  .put(protect, updateContact)
  .delete(protect, deleteContact);

export default router;
