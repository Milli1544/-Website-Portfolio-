import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../../config/config.js";

// Middleware to verify JWT token
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Get user from token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Middleware to check if user is admin
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Middleware to check if user has permission (admin or owns the resource)
export const hasAuthorization = (req, res, next) => {
  const authorized = req.user && (req.user.role === "admin" || req.user._id.toString() === req.params.userId);
  
  if (!authorized) {
    return res.status(403).json({
      success: false,
      message: "User is not authorized.",
    });
  }
  
  next();
};