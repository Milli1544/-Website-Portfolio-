import express from "express";
import { requireSignin, requireAdmin } from "../middleware/auth.middleware.js";
import { checkDBConnection } from "../middleware/dbCheck.js";
import User from "../models/user.model.js";
import Contact from "../models/Contact.js";
import Project from "../models/Project.js";
import Qualification from "../models/qualification.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(requireSignin, requireAdmin);

// Dashboard stats
router.get("/dashboard", checkDBConnection, async (req, res) => {
  try {
    const [userCount, contactCount, projectCount, qualificationCount] = await Promise.all([
      User.countDocuments(),
      Contact.countDocuments(),
      Project.countDocuments(),
      Qualification.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        users: userCount,
        contacts: contactCount,
        projects: projectCount,
        qualifications: qualificationCount,
        totalEntities: userCount + contactCount + projectCount + qualificationCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message
    });
  }
});

// Get all entities (for admin overview)
router.get("/entities", checkDBConnection, async (req, res) => {
  try {
    const [users, contacts, projects, qualifications] = await Promise.all([
      User.find().select("-password").sort({ createdAt: -1 }).limit(10),
      Contact.find().sort({ createdAt: -1 }).limit(10),
      Project.find().sort({ createdAt: -1 }).limit(10),
      Qualification.find().sort({ createdAt: -1 }).limit(10)
    ]);

    res.json({
      success: true,
      data: {
        users,
        contacts,
        projects,
        qualifications
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching entities",
      error: error.message
    });
  }
});

// Bulk operations
router.delete("/bulk-delete", checkDBConnection, async (req, res) => {
  try {
    const { entityType, ids } = req.body;
    
    if (!entityType || !ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: "Entity type and IDs array are required"
      });
    }

    let Model;
    switch (entityType) {
      case 'users':
        Model = User;
        break;
      case 'contacts':
        Model = Contact;
        break;
      case 'projects':
        Model = Project;
        break;
      case 'qualifications':
        Model = Qualification;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid entity type"
        });
    }

    const result = await Model.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${result.deletedCount} ${entityType} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in bulk delete operation",
      error: error.message
    });
  }
});

// Export data
router.get("/export/:entityType", checkDBConnection, async (req, res) => {
  try {
    const { entityType } = req.params;
    
    let Model;
    switch (entityType) {
      case 'users':
        Model = User;
        break;
      case 'contacts':
        Model = Contact;
        break;
      case 'projects':
        Model = Project;
        break;
      case 'qualifications':
        Model = Qualification;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid entity type"
        });
    }

    const data = await Model.find().select(entityType === 'users' ? '-password' : '');

    res.json({
      success: true,
      data,
      count: data.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error exporting data",
      error: error.message
    });
  }
});

export default router;